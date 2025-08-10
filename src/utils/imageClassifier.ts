import * as FileSystem from "expo-file-system";
import * as jpeg from "jpeg-js";
import * as tf from "@tensorflow/tfjs";
import { MobileNet } from "@tensorflow-models/mobilenet";
import { ImagePickerAsset } from "expo-image-picker";

export async function classifyImage(
  model: MobileNet,
  image: ImagePickerAsset
) {
  // 1. Read the image file as a base64 string
  const imgB64 = await FileSystem.readAsStringAsync(image.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // 2. Decode the base64 string into a Uint8Array
  const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
  const rawImageData = new Uint8Array(imgBuffer);

  // 3. Decode the JPEG image data into pixel data
  const { width, height, data } = jpeg.decode(rawImageData, {
    useTArray: true,
  });

  // 4. Create a 3D tensor from the pixel data
  // use .slice() to remove the alpha channel
  const tensor = tf
    .tensor3d(data, [height, width, 4])
    .slice([0, 0, 0], [height, width, 3]);

  // 5. Classify the image tensor
  const predictions = await model.classify(tensor);
  console.log("Predictions: ", predictions);
  return predictions;
}
