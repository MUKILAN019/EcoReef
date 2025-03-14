import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view ,permission_classes
from rest_framework import permissions
from .serializers import UserSerializer
from .models import CoralImage
from django.contrib.auth.models import User
from .opencv_analysis import analyze_image  
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

@api_view(["POST"])
@permission_classes([IsAuthenticated])  # Requires JWT authentication
def upload_image(request):
    """API to upload coral images and analyze them using OpenCV"""
    try:
        user = request.user  # Extract user from JWT token

        image = request.FILES.get("image")
        latitude = request.data.get("latitude")
        longitude = request.data.get("longitude")

        if not image or not latitude or not longitude:
            return Response({"error": "Missing required fields"}, status=400)

        latitude = float(latitude)
        longitude = float(longitude)

        # Save image initially as "Processing"
        coral_image = CoralImage.objects.create(
            user=user, image=image, latitude=latitude, longitude=longitude, status="Processing"
        )

        # Analyze the image using OpenCV
        coral_image.status = analyze_image(coral_image.image.path)
        coral_image.save()

        return Response({
            "message": "Image uploaded successfully!",
            "status": coral_image.status,
            "image_url": request.build_absolute_uri(coral_image.image_url()),
        }, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
def get_images(request):
    """API to fetch all coral images"""
    images = CoralImage.objects.all()

    image_list = [
        {
            "id": str(image.id),
            "user": image.user.username,
            "latitude": image.latitude,
            "longitude": image.longitude,
            "status": image.status,
            "uploaded_at": image.uploaded_at,
            "image_url": request.build_absolute_uri(image.image_url())
        }
        for image in images
    ]

    return Response({"coral_images": image_list}, status=200)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_your_images(request):
    """API to fetch coral images uploaded by the logged-in user."""
    
    # Get user from the JWT token
    user = request.user  

    # Fetch only the images uploaded by the logged-in user
    images = CoralImage.objects.filter(user=user)

    image_list = [
        {
            "id": str(image.id),
            "user": image.user.username,
            "latitude": image.latitude,
            "longitude": image.longitude,
            "status": image.status,
            "uploaded_at": image.uploaded_at,
            "image_url": request.build_absolute_uri(image.image_url())
        }
        for image in images
    ]

    return Response({"coral_images": image_list}, status=200)



@api_view(["GET"])
def get_news(request):
    """Fetch coral reef news from DigitalNZ and return as JSON"""
    api_key = "vmzzQbNsQ6bazMF8zwYG"
    url = f"https://api.digitalnz.org/v3/records.json?api_key={api_key}&text=reef&per_page=5&fields=title,creator,date,landing_url"

    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            articles = [
                {
                    "title": article.get("title", "No Title"),
                    "author": ", ".join(article.get("creator", ["Unknown"])),
                    "created_date": article.get("date", ["Unknown"])[0],
                    "link": article.get("landing_url", "#"),
                }
                for article in data.get("search", {}).get("results", [])
            ]
            return JsonResponse({"results": articles}, status=200)
        return JsonResponse({"error": "Failed to fetch news"}, status=response.status_code)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(["DELETE"])
def delete_reef(request, reef_id):
    """API to delete a coral reef entry"""
    reef = get_object_or_404(CoralImage, id=reef_id)
    
    # Delete reef from the database
    reef.delete()
    
    return Response({"message": "Reef deleted successfully!"}, status=200)

@api_view(['POST'])
@permission_classes([permissions.AllowAny]) 
def register_user(request):
    """Registers a new user."""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    """Logs in a user using email and password and returns JWT tokens."""
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=400)

    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid email or password"}, status=401)

    
    user = authenticate(username=user.username, password=password)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful!",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })
    
    return Response({"error": "Invalid email or password"}, status=401)