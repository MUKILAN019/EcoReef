from django.db import models
import uuid
from django.contrib.auth.models import User

class CoralImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    image = models.ImageField(upload_to="coral_images/")
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(
        max_length=20,
        choices=[
            ("Healthy", "Healthy"),
            ("Bleached", "Bleached"),
            ("Partially Bleached", "Partially Bleached"),
            ("Processing", "Processing")
        ],
        default="Processing"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def image_url(self):
        """Returns the full image URL."""
        return f"/media/{self.image}"

    def __str__(self):
        return f"{self.user.username} | {self.status} | {self.latitude}, {self.longitude}"
