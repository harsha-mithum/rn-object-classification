import styles from "@/constants/styles";
import { ActivityIndicator, Animated, Image, Text, View } from "react-native";

const LoadingScreen = ({ imageUri }: { imageUri: string }) => (
  <Animated.View style={styles.centeredContainer}>
    <View style={styles.imagePreviewContainerLarge}>
      <Image source={{ uri: imageUri }} style={styles.imagePreview} />
    </View>
    <ActivityIndicator
      size="large"
      color="#14b8a6"
      style={{ marginBottom: 16 }}
    />
    <Text style={styles.loadingText}>Analyzing Image...</Text>
    <Text style={styles.loadingSubText}>Please wait a moment.</Text>
  </Animated.View>
);

export default LoadingScreen;
