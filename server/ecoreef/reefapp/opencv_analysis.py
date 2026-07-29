import cv2
import numpy as np

def analyze_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return "Error: Image not found"

    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # ---- 1. Bleached coral (white / very pale) ----
    lower_bleach = np.array([0, 0, 180], dtype=np.uint8)
    upper_bleach = np.array([180, 40, 255], dtype=np.uint8)
    bleach_mask = cv2.inRange(hsv, lower_bleach, upper_bleach)

    # ---- 2. Healthy coral colors (brown, green, tan, pink/purple pigments) ----
    lower_healthy1 = np.array([5, 40, 40], dtype=np.uint8)     # browns/oranges
    upper_healthy1 = np.array([30, 255, 220], dtype=np.uint8)
    healthy_mask1 = cv2.inRange(hsv, lower_healthy1, upper_healthy1)

    lower_healthy2 = np.array([35, 30, 30], dtype=np.uint8)    # greens
    upper_healthy2 = np.array([85, 255, 220], dtype=np.uint8)
    healthy_mask2 = cv2.inRange(hsv, lower_healthy2, upper_healthy2)

    lower_healthy3 = np.array([140, 30, 40], dtype=np.uint8)   # pinks/purples
    upper_healthy3 = np.array([170, 255, 220], dtype=np.uint8)
    healthy_mask3 = cv2.inRange(hsv, lower_healthy3, upper_healthy3)

    healthy_mask = cv2.bitwise_or(healthy_mask1, cv2.bitwise_or(healthy_mask2, healthy_mask3))

    # ---- 3. Exclude deep-water blue background from both masks ----
    lower_water = np.array([90, 40, 40], dtype=np.uint8)
    upper_water = np.array([135, 255, 255], dtype=np.uint8)
    water_mask = cv2.inRange(hsv, lower_water, upper_water)
    not_water = cv2.bitwise_not(water_mask)

    bleach_mask = cv2.bitwise_and(bleach_mask, not_water)
    healthy_mask = cv2.bitwise_and(healthy_mask, not_water)

    # ---- 4. Clean up noise ----
    kernel = np.ones((5, 5), np.uint8)
    bleach_mask = cv2.morphologyEx(bleach_mask, cv2.MORPH_OPEN, kernel)
    bleach_mask = cv2.morphologyEx(bleach_mask, cv2.MORPH_CLOSE, kernel)
    healthy_mask = cv2.morphologyEx(healthy_mask, cv2.MORPH_OPEN, kernel)
    healthy_mask = cv2.morphologyEx(healthy_mask, cv2.MORPH_CLOSE, kernel)

    bleached_pixels = np.count_nonzero(bleach_mask)
    healthy_pixels = np.count_nonzero(healthy_mask)
    coral_pixels = bleached_pixels + healthy_pixels  # total detected coral area

    if coral_pixels == 0:
        return "Error: No coral detected in image"

    # ---- 5. Ratio computed against CORAL area, not whole image ----
    bleach_ratio = (bleached_pixels / coral_pixels) * 100

    print(f"Coral pixels detected: {coral_pixels}")
    print(f"Bleach Ratio (of coral area): {bleach_ratio:.2f}%")

    # ---- 6. Classification thresholds ----
    if bleach_ratio > 50:
        status = "Bleached"
    elif 15 < bleach_ratio <= 50:
        status = "Partially Bleached"
    else:
        status = "Healthy"

    return status