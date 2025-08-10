import { StyleSheet } from "react-native";
import COLORS from "./colors";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.slate100,
  },
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  resultScreen: {
    padding: 16,
    marginTop: 30,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.slate800,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.slate600,
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGroup: {
    marginTop: 16,
  },
  buttonPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.teal500,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonTextPrimary: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIconPrimary: {
    color: COLORS.white,
    marginRight: 8,
    fontSize: 20,
  },
  buttonSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.slate200,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonTextSecondary: {
    color: COLORS.slate700,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIconSecondary: {
    color: COLORS.slate700,
    marginRight: 8,
    fontSize: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 8,
  },
  backIcon: {
    fontSize: 28,
    color: COLORS.slate600,
  },
  imagePreviewContainerLarge: {
    width: 280,
    height: 280,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 32,
    overflow: "hidden",
  },
  imagePreviewContainerSmall: {
    width: "100%",
    height: 256,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 32,
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.slate700,
  },
  loadingSubText: {
    fontSize: 16,
    color: COLORS.slate500,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.slate800,
    marginBottom: 12,
  },
  resultsList: {
    gap: 12,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topResultCard: {
    backgroundColor: COLORS.teal500,
  },
  resultIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.teal50,
    marginRight: 16,
  },
  topResultIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  resultIcon: {
    fontSize: 24,
    color: COLORS.teal500,
  },
  topResultIcon: {
    color: COLORS.white,
  },
  resultLabelContainer: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.slate900,
  },
  topResultLabel: {
    color: COLORS.white,
  },
  resultScoreContainer: {
    alignItems: "flex-end",
  },
  resultScore: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.teal600,
  },
  topResultScore: {
    color: COLORS.white,
  },
  resultScoreLabel: {
    fontSize: 12,
    color: COLORS.slate500,
  },
  topResultScoreLabel: {
    color: COLORS.teal100,
  },
  icon: {
    fontWeight: "bold",
  },
  errorContainer: {
    backgroundColor: COLORS.red100,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.red500,
    marginBottom: 16,
  },
  errorTextBold: {
    color: COLORS.red800,
    fontWeight: "bold",
  },
  errorText: {
    color: COLORS.red800,
  },
  footer: {
    position: "absolute",
    bottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.slate400,
  },
});

export default styles;
