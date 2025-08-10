import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

export async function loadModel() {
  await tf.ready();
  const model = await mobilenet.load();
  console.log("Model loaded successfully!");
  return model;
}
