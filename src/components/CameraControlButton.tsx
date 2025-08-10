import React from "react";

import { GestureResponderEvent, TouchableOpacity } from "react-native";

type CameraControlButtonProps = {
  icon: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
};

const CameraControlButton: React.FC<CameraControlButtonProps> = ({
  icon,
  onPress,
}) => (
  <TouchableOpacity
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
    onPress={onPress}
  >
    {icon}
  </TouchableOpacity>
);

export default CameraControlButton;