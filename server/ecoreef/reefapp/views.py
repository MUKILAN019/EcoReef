import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CoralImage
from django.contrib.auth.models import User
from .opencv_analysis import analyze_image  # Import OpenCV analysis function
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

@api_view(["POST"])
def upload_image(request):
    """API to upload coral images and analyze them using OpenCV"""
    try:
        user_id = request.data.get("user_id")
        user = get_object_or_404(User, id=user_id)  # Safer user fetching

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
