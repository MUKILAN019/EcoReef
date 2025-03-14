from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CoralImage

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def validate_email(self, value):
        """Ensure the email is unique."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        """Create user with a hashed password."""
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Hashes the password
        user.save()
        return user


class CoralImageSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CoralImage
        fields = ['id', 'user', 'image', 'image_url', 'latitude', 'longitude', 'status', 'uploaded_at']
        read_only_fields = ['id', 'user', 'uploaded_at']

    def get_image_url(self, obj):
        """Return the full image URL."""
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

    def validate_status(self, value):
        """Ensure status is valid."""
        valid_statuses = dict(CoralImage._meta.get_field('status').choices)
        if value not in valid_statuses:
            raise serializers.ValidationError("Invalid status value.")
        return value
