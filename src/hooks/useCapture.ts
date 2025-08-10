import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";

export const useCapture = (
  initialFacing: CameraType = "back",
  onCapture?: (
    image: ImagePicker.ImagePickerAsset | CameraCapturedPicture
  ) => void
) => {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>(initialFacing);
  const [permission, requestPermission] = useCameraPermissions();

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const captureImage = async () => {
    try {
      const capturedImage = await cameraRef.current?.takePictureAsync({
        base64: true,
        quality: 1,
      });
      if (capturedImage && onCapture) {
        onCapture(capturedImage);
      }
    } catch (error) {
      console.error("Capture failed:", error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && onCapture) {
        onCapture(result.assets[0]);
      }
    } catch (error) {
      console.error("Image picking failed:", error);
    }
  };

  return {
    cameraRef,
    facing,
    permission,
    requestPermission,
    toggleCameraFacing,
    captureImage,
    pickImage,
  };
};
