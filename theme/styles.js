import { StyleSheet } from "react-native";
import theme from "./theme";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: theme.fontSizes.sm,
    fontFamily: "Obviously",
  },
  textInput: {
    fontSize: theme.fontSizes.md,
    backgroundColor: "#cacaca",
    alignSelf: "stretch",
  },
});

export default styles;
