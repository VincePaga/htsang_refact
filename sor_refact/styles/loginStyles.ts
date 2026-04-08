import { StyleSheet } from "react-native";
import { commonStyles } from "./commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  columnWrapper: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },

  loginFormContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
  },

  inputView: commonStyles.inputView,
  inputText: commonStyles.inputText,
  loginBtn: commonStyles.actionBtn,
  loginText: commonStyles.actionBtnText,
  ModalView: commonStyles.modalOverlay,
  popup: commonStyles.popup,

  resetPopup: {
    ...commonStyles.popup,
    height: 450,
    width: 400,
  },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "white",
  },

  messageContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
  },

  messageTitleWrapper: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#226999",
  },

  messageTitle: {
    fontSize: 24,
    textAlign: "center",
    width: 300,
    color: "#2981ba",
  },

  messageButtonWrapper: {
    width: 100,
    justifyContent: "center",
  },

  resetContainer: {
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
  },

  resetTitleWrapper: {
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#226999",
  },

  resetTitle: {
    fontSize: 24,
    textAlign: "center",
    width: 400,
    color: "#2981ba",
  },

  loadingPlaceholder: {
    height: 36,
  },

  resetButtonsRow: {
    width: 250,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  clientLogoWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  clientLogo: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },

  mainBrandWrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
    marginLeft: 10,
  },

  mainBrandLogo: {
    height: "100%",
    resizeMode: "contain",
    marginBottom: 40,
  },

  bottomBrandRow: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
    flexDirection: "row",
  },

  bottomBrandLeft: {
    marginLeft: -25,
    marginRight: -100,
  },

  bottomBrandLeftLogo: {
    height: "30%",
    resizeMode: "contain",
  },

  bottomBrandRightLogo: {
    resizeMode: "contain",
  },
});
