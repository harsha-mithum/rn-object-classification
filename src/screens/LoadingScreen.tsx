import styles from "@/constants/styles";
import { Animated, Image, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import searchAnimation from "@/assets/search-animation.json";

const LoadingScreen = ({ imageUri }: { imageUri: string }) => (
  <Animated.View style={styles.centeredContainer}>
    <View style={styles.imagePreviewContainerLarge}>
      <Image source={{ uri: imageUri }} style={styles.imagePreview} />
    </View>

    <LottieView
      source={searchAnimation}
      autoPlay
      loop
      style={{ height: 100, width: 100, margin: 10 }}
    />
    
    <Text style={styles.loadingText}>Analyzing Image...</Text>
    <Text style={styles.loadingSubText}>Please wait a moment.</Text>
  </Animated.View>
);

export default LoadingScreen;
