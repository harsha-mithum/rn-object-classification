import styles from "@/constants/styles";
import { ActivityIndicator, Animated, Image, Text, View } from "react-native";
import LottieView from "lottie-react-native";

const LoadingScreen = ({ imageUri }: { imageUri: string }) => (
  <Animated.View style={styles.centeredContainer}>
    <View style={styles.imagePreviewContainerLarge}>
      <Image source={{ uri: imageUri }} style={styles.imagePreview} />
    </View>

    <LottieView
      source={require("@/assets/search-animation.json")}
      autoPlay
      loop
      style={{ height: 100, width: 100, margin: 10 }}
    />
    
    <Text style={styles.loadingText}>Analyzing Image...</Text>
    <Text style={styles.loadingSubText}>Please wait a moment.</Text>
  </Animated.View>
);

export default LoadingScreen;
