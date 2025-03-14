import cv2
import numpy as np

def analyze_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return "Error: Image not found"
    
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # 🔹 More accurate bleaching detection: avoid misclassifying bright corals
    lower_bleach = np.array([0, 0, 190], dtype=np.uint8)  # Raised lower value to avoid sand/yellow corals
    upper_bleach = np.array([180, 30, 255], dtype=np.uint8)  # Reduced saturation to exclude natural colors

    mask = cv2.inRange(hsv, lower_bleach, upper_bleach)

    # 🔹 Apply morphological operations to remove noise
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    # 🔹 Calculate bleached area percentage
    total_pixels = image.shape[0] * image.shape[1]
    bleached_pixels = np.count_nonzero(mask)
    bleach_ratio = (bleached_pixels / total_pixels) * 100

    print(f"Bleach Ratio: {bleach_ratio:.2f}%")  # Debugging

    # 🔹 New classification: lower sensitivity for healthy corals
    if bleach_ratio > 25:  # Raised threshold to avoid false positives
        return "Bleached"
    elif 8 < bleach_ratio <= 25:  # Increased partial bleaching range
        return "Partially Bleached"
    else:
        return "Healthy"

