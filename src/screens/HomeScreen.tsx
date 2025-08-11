import loader from "@/assets/loader.json";
import ErrorMessage from "@/components/ErrorMessage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/constants/styles";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = ({
  onImageSelect,
  error,
}: {
  onImageSelect: (type: string) => void;
  error: string;
}) => (
  <Animated.View style={styles.homeContainer}>
    <Header title="Image Classifier" onBack={() => {}} />

    <LottieView
      source={loader}
      autoPlay
      loop
      style={{ height: 200, width: 200, margin: 20 }}
    />

    <View style={styles.card}>
      <Text style={styles.subtitle}>
        Upload an image or use your camera to identify objects.
      </Text>
      {error && <ErrorMessage message={error} />}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => onImageSelect("gallery")}
        >
          <Feather name="upload" style={styles.buttonIconPrimary} />
          <Text style={styles.buttonTextPrimary}>Upload from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => onImageSelect("camera")}
        >
          <Feather name="camera" style={styles.buttonIconSecondary} />
          <Text style={styles.buttonTextSecondary}>Use Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Footer />
  </Animated.View>
);

export default HomeScreen;
