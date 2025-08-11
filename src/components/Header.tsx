import styles from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title: string;
  onBack: (event: GestureResponderEvent) => void;
  showBack?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, onBack, showBack = false }) => (
  <View style={styles.header}>
    {showBack && (
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="chevron-back-outline" style={styles.backIcon} />
      </TouchableOpacity>
    )}
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default Header;
