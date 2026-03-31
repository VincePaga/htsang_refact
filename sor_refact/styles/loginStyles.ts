import { StyleSheet } from "react-native";

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

  inputView: {
    width: 300,
    backgroundColor: "white",
    borderColor: "#003f5c",
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },

  inputText: {
    height: 50,
    width: 400,
    color: "#003f5c",
    fontSize: 20,
  },

  loginBtn: {
    backgroundColor: "#2981ba",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  loginText: {
    color: "white",
  },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "white",
  },

  ModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "#00000077",
  },

  popup: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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