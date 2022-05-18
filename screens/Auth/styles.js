import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  wrapper: {
    marginTop: StatusBar.currentHeight,
  },
  authTop: {
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
  },
  authForm: {},
  authInput: {
    borderBottomWidth: 0.5,
    marginTop: 20,
    borderBottomColor: "#303030",
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 8,
  },
});
