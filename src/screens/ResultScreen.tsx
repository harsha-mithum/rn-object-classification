import Header from "@/components/Header";
import ResultCard from "@/components/ResultCard";
import styles from "@/constants/styles";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const ResultScreen = ({
  imageUri,
  results,
  onReset,
}: {
  imageUri: string;
  results: { className: string; probability: number }[];
  onReset: () => void;
}) => (
  <ScrollView contentContainerStyle={styles.resultScreen}>
    <Header title="Classification Results" onBack={onReset} showBack />
    <View style={styles.imagePreviewContainerSmall}>
      <Image source={{ uri: imageUri }} style={styles.imagePreview} />
    </View>
    <Text style={styles.resultsHeader}>Top Matches</Text>
    <View style={styles.resultsList}>
      {results.map((result, index) => (
        <ResultCard
          key={index}
          label={result.className}
          score={result.probability}
          isTopResult={index === 0}
        />
      ))}
    </View>
    <TouchableOpacity
      style={[styles.buttonPrimary, { marginTop: 32 }]}
      onPress={onReset}
    >
      <Text style={styles.buttonTextPrimary}>Scan Another Image</Text>
    </TouchableOpacity>
  </ScrollView>
);

export default ResultScreen;
