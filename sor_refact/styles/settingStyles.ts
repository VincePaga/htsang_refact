import { StyleSheet } from "react-native";
import { commonStyles } from "./commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  corpo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  formWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 400,
    width: 400,
  },

  inputView: commonStyles.inputView,
  inputText: commonStyles.inputText,
  btn: commonStyles.actionBtn,
});
