import styles from "@/constants/styles";
import React from "react";
import { Text, View } from "react-native";

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Image Classifier v1.0</Text>
  </View>
);

export default Footer;
