import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#87ceeb",
    height: 80,
    alignItems: "flex-start",
  },

  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  leftIconSpacing: {
    marginLeft: 10,
    marginTop: 35,
  },

  listButton: {
    marginLeft: 12,
    marginTop: 35,
    backgroundColor: "#3682f3",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  listButtonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "700",
  },

  logoContainer: {
    marginTop: 2,
    marginLeft: -6,
  },

  logo: {
    width: 100,
    resizeMode: "contain",
  },

  rightButton: {
    marginRight: 10,
    marginTop: 35,
  },

  icon30: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  icon25: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },

  backButton: {
    marginLeft: 10,
    marginTop: 35,
    width: 30,
    height: 30,
    backgroundColor: "#3682f3",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginLeft: -4,
  },

  emptyRightContainer: {
    marginRight: 10,
    marginTop: 35,
  },
});