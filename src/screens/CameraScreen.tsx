import CameraControlButton from "@/components/CameraControlButton";
import Header from "@/components/Header";
import COLORS from "@/constants/colors";
import { useCapture } from "@/hooks/useCapture";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CameraCapturedPicture, CameraType, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CameraScreenProps = {
  onCapture?: (
    image: ImagePicker.ImagePickerAsset | CameraCapturedPicture
  ) => void;
  initialFacing?: CameraType;
  onReset: () => void;
};

export const CameraScreen = ({
  onCapture,
  initialFacing = "back",
  onReset,
}: CameraScreenProps) => {
  const {
    cameraRef,
    facing,
    permission,
    requestPermission,
    toggleCameraFacing,
    captureImage,
    pickImage,
  } = useCapture(initialFacing, onCapture);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{ flex: 1, backgroundColor: COLORS.slate100, marginTop: 40 }}
      >
        <Header title="Permission Required" onBack={onReset} showBack />
        <View style={styles.centeredContainer}>
          <Text style={styles.message}>
            We need your permission to use the camera
          </Text>
          <TouchableOpacity
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.teal500,
                paddingVertical: 16,
                borderRadius: 12,
                marginBottom: 16,
                marginTop: 32,
                paddingHorizontal: 40,
              },
            ]}
            onPress={requestPermission}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Grant Permission
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="picture"
        autofocus="on"
      >
        <View style={styles.buttonContainer}>
          <CameraControlButton
            icon={
              <MaterialIcons name="photo-library" size={32} color="white" />
            }
            onPress={pickImage}
          />
          <CameraControlButton
            icon={<Ionicons name="ellipse-outline" size={64} color="white" />}
            onPress={captureImage}
          />
          <CameraControlButton
            icon={<MaterialIcons name="cameraswitch" size={32} color="white" />}
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
