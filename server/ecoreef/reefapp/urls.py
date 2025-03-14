from django.urls import path
from .views import upload_image, get_images, get_news, delete_reef

urlpatterns = [
    path("upload_image/", upload_image, name="upload_image"),
    path("get_images/", get_images, name="get_images"),
    path("news/", get_news, name="get_news"),
     path("delete_reef/<uuid:reef_id>/", delete_reef, name="delete_reef"),
]  

