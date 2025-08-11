import styles from "@/constants/styles";
import { Text, View } from "react-native";

const ErrorMessage = ({ message }: { message: string }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTextBold}>Error</Text>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

export default ErrorMessage;
