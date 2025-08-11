import styles from "@/constants/styles";
import { CameraScreen } from "@/screens/CameraScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoadingScreen from "@/screens/LoadingScreen";
import ResultScreen from "@/screens/ResultScreen";
import { classifyImage as classifyImageUtil } from "@/utils/imageClassifier";
import { loadModel as loadModelUtil } from "@/utils/modelLoader";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useReducer } from "react";
import { Alert, SafeAreaView, StatusBar } from "react-native";

const initialState = {
  view: "home",
  image: null,
  results: [],
  error: null,
  isTfReady: false,
  model: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.payload };
    case "SET_IMAGE":
      return { ...state, image: action.payload, error: null };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, view: "home" };
    case "INITIALIZE_MODEL":
      return { ...state, model: action.payload, isTfReady: true };
    case "RESET":
      return { ...initialState, model: state.model, isTfReady: state.isTfReady };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { view, image, results, error, isTfReady, model } = state;

  const initialize = useCallback(async () => {
    try {
      const loadedModel = await loadModelUtil();
      dispatch({ type: "INITIALIZE_MODEL", payload: loadedModel });
    } catch (error) {
      console.error("Error loading model: ", error);
      dispatch({ type: "SET_ERROR", payload: "Could not load model." });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleImageClassification = useCallback(async () => {
    if (!image || !model) {
      Alert.alert("Image processing failed. Please try again.");
      return;
    }

    dispatch({ type: "SET_VIEW", payload: "loading" });
    dispatch({ type: "SET_RESULTS", payload: [] });

    try {
      const predictions = await classifyImageUtil(model, image);
      dispatch({ type: "SET_RESULTS", payload: predictions });
      dispatch({ type: "SET_VIEW", payload: "result" });
    } catch (error) {
      console.error("Error classifying image: ", error);
      dispatch({ type: "SET_ERROR", payload: "Could not classify image." });
    }
  }, [image, model]);

  useEffect(() => {
    if (image?.uri && model) {
      handleImageClassification();
    } else if (image?.uri) {
      dispatch({ type: "SET_VIEW", payload: "loading" });
    } else {
      dispatch({ type: "SET_VIEW", payload: "home" });
    }
  }, [image, model, handleImageClassification]);

  const handleImageSelect = (source: string) => {
    if (source === "gallery") {
      pickImage();
    }
    if (source === "camera") {
      dispatch({ type: "SET_VIEW", payload: "camera" });
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
        dispatch({ type: "SET_IMAGE", payload: result.assets[0] });
      }
    } catch (error) {
      console.error("Image picking failed:", error);
      dispatch({ type: "SET_ERROR", payload: "Could not select image." });
    }
  };

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const renderView = () => {
    switch (view) {
      case "camera":
        return (
          <CameraScreen
            initialFacing="back"
            onCapture={(capturedImage) => {
              dispatch({ type: "SET_IMAGE", payload: capturedImage });
            }}
            onReset={handleReset}
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
        return <HomeScreen onImageSelect={handleImageSelect} error={error} />;
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
