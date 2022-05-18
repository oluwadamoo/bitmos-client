import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Header from "../components/Header";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const HelpScreen = ({ navigation }) => {
  const size = 30;
  const color = "#747373";
  return (
    <>
      <Header home navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.heading}>Related Articles</Text>

        <Pressable
          onPress={() =>
            navigation.navigate("Help Component", {
              title: "Terms of Use",
              content: "Article content goes here",
              navigation: { navigation },
            })
          }
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.row]}
        >
          <FontAwesome5 name="file-signature" size={size} color={color} />
          <Text style={styles.rowText}>Terms of Use</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("Help Component", {
              title: "FAQs",
              content: "Article content goes here",
              navigation: { navigation },
            })
          }
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.row]}
        >
          <Ionicons name="ios-chatbubbles" size={size} color={color} />
          <Text style={styles.rowText}>Frequently Asked Questions (FAQs)</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("Help Component", {
              title: "Privacy Policy",
              content: "Article content goes here",
              navigation: { navigation },
            })
          }
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.row]}
        >
          <FontAwesome5 name="user-lock" size={size} color={color} />
          <Text style={styles.rowText}>Privacy Policy</Text>
        </Pressable>
      </View>
    </>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 16,
  },
  heading: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 16,
    color: "#747373",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9b9a9a",
    borderRadius: 0.5,
    borderBottomWidth: 0.3,
    padding: 5,
    paddingVertical: 10,
  },
  rowText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#747373",
    marginLeft: 15,
  },
});
