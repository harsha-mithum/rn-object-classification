import styles from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Header = ({ title, onBack, showBack = false }) => (
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
