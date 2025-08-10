import styles from "@/constants/styles";
import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import { Text, View } from "react-native";

const ResultCard = ({ label, score, isTopResult }) => {
  const percentage = useMemo(() => Math.round(score * 100), [score]);
  return (
    <View style={[styles.resultCard, isTopResult && styles.topResultCard]}>
      <View
        style={[
          styles.resultIconContainer,
          isTopResult && styles.topResultIconContainer,
        ]}
      >
        <Feather
          name="check"
          style={[styles.resultIcon, isTopResult && styles.topResultIcon]}
        />
      </View>
      <View style={styles.resultLabelContainer}>
        <Text
          style={[styles.resultLabel, isTopResult && styles.topResultLabel]}
        >
          {label}
        </Text>
      </View>
      <View style={styles.resultScoreContainer}>
        <Text
          style={[styles.resultScore, isTopResult && styles.topResultScore]}
        >
          {percentage}%
        </Text>
        <Text
          style={[
            styles.resultScoreLabel,
            isTopResult && styles.topResultScoreLabel,
          ]}
        >
          Confidence
        </Text>
      </View>
    </View>
  );
};

export default ResultCard;
