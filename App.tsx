import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import * as jpeg from "jpeg-js";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [isTfReady, setIsTfReady] = useState(false);
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadModel = async () => {
    try {
      await tf.ready();

      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setIsTfReady(true);

      console.log("Model loaded successfully!");
    } catch (error) {
      console.error("Error loading model: ", error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const pickImage = async () => {
    setPredictions([]);
    setImage(null);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const classifyImage = async () => {
    if (!model || !image) {
      return;
    }
    setIsLoading(true);
    setPredictions([]);

    try {
      // 1. Read the image file as a base64 string
      const imgB64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 2. Decode the base64 string into a Uint8Array
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const rawImageData = new Uint8Array(imgBuffer);

      // 3. Decode the JPEG image data into pixel data
      const { width, height, data } = jpeg.decode(rawImageData);

      // 4. Create a 3D tensor from the pixel data
      // use .slice() to remove the alpha channel
      const tensor = tf
        .tensor3d(data, [height, width, 4])
        .slice([0, 0, 0], [height, width, 3]); 

      // 5. Classify the image tensor
      const predictions = await model.classify(tensor as any);
      setPredictions(predictions);
      console.log("Predictions: ", predictions);
    } catch (error) {
      console.error("Error classifying image: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Classifier</Text>
      <Text style={styles.status}>
        TensorFlow.js Ready: {isTfReady ? "✅" : "⏳"}
      </Text>
      <Text style={styles.status}>Model Loaded: {model ? "✅" : "⏳"}</Text>

      {image && <Image source={{ uri: image.uri }} style={styles.image} />}

      <View style={styles.buttonContainer}>
        <Button title="Pick an Image" onPress={pickImage} color="#6200ee" />
        {image && (
          <Button
            title="Classify Image"
            onPress={classifyImage}
            color="#03dac6"
            disabled={isLoading}
          />
        )}
      </View>

      {isLoading && <Text style={styles.predictionText}>Classifying...</Text>}

      {predictions.length > 0 && (
        <View style={styles.predictionWrapper}>
          <Text style={styles.predictionTitle}>Predictions:</Text>
          {predictions.map((p, i) => (
            <Text key={i} style={styles.predictionText}>
              {`${p.className} (${(p.probability * 100).toFixed(2)}%)`}
            </Text>
          ))}
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 300,
    height: 225,
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  predictionWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  predictionText: {
    fontSize: 16,
    marginTop: 5,
  },
});
