import cv2
import numpy as np

def analyze_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return "Error: Image not found"
    
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)


    lower_bleach = np.array([0, 0, 190], dtype=np.uint8)  
    upper_bleach = np.array([180, 30, 255], dtype=np.uint8)  

    mask = cv2.inRange(hsv, lower_bleach, upper_bleach)

   
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

 
    total_pixels = image.shape[0] * image.shape[1]
    bleached_pixels = np.count_nonzero(mask)
    bleach_ratio = (bleached_pixels / total_pixels) * 100

    print(f"Bleach Ratio: {bleach_ratio:.2f}%")  

   
    if bleach_ratio > 25:  
        return "Bleached"
    elif 8 < bleach_ratio <= 25: 
        return "Partially Bleached"
    else:
        return "Healthy"

