import styles from "@/constants/styles";
import { CameraScreen } from "@/screens/CameraScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoadingScreen from "@/screens/LoadingScreen";
import ResultScreen from "@/screens/ResultScreen";
import { classifyImage as classifyImageUtil } from "@/utils/imageClassifier";
import { loadModel as loadModelUtil } from "@/utils/modelLoader";
import { MobileNet } from "@tensorflow-models/mobilenet";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, SafeAreaView, StatusBar } from "react-native";
const App = () => {
  const [view, setView] = useState("home");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [results, setResults] = useState<
    { className: string; probability: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const [isTfReady, setIsTfReady] = useState(false);
  const [model, setModel] = useState<MobileNet | null>(null);

  const initialize = useCallback(async () => {
    try {
      const loadedModel = await loadModelUtil();
      setModel(loadedModel);
      setIsTfReady(true);
    } catch (error) {
      console.error("Error loading model: ", error);
      setError("Could not load model.");
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (image?.uri) {
      handleImageClassification();
    }
  }, [image]);

  const handleImageSelect = (source: string) => {
    if (source === "gallery") {
      pickImage();
    }
    if (source === "camera") {
      setView("camera");
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
        setError(null);
      }
    } catch (error) {
      console.error("Image picking failed:", error);
      setError("Could not select image.");
      setView("home");
    }
  };

  const handleImageClassification = async () => {
    if (!image) {
      Alert.alert("Image processing failed. Please try again.");
      return;
    }

    setView("loading");
    setResults([]);

    try {
      if (!model) await initialize();

      const predictions = await classifyImageUtil(model, image);
      setResults(predictions);
      setView("result");
    } catch (error) {
      console.error("Error classifying image: ", error);
      setError("Could not classify image.");
      setView("home");
    }
  };

  const handleReset = useCallback(() => {
    setView("home");
    setImage(null);
    setResults([]);
    setError(null);
  }, []);

  const renderView = () => {
    switch (view) {
      case "camera":
        return (
          <CameraScreen
            initialFacing="back"
            onCapture={(capturedImage) => {
              setImage(capturedImage);
              setError(null);
            }}
          />
        );
      case "loading":
        return <LoadingScreen imageUri={image?.uri} />;
      case "result":
        return (
          <ResultScreen
            imageUri={image?.uri}
            results={results}
            onReset={handleReset}
          />
        );
      case "home":
      default:
        return (
          <HomeScreen
            onImageSelect={handleImageSelect}
            error={error}
            isTfReady={isTfReady}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />
      {renderView()}
    </SafeAreaView>
  );
};

export default App;
