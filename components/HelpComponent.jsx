import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "./Header";

function HelpComponent({ route }) {
  const {
    title,
    content,
    // navigation
  } = route.params;
  const navigation = useNavigation();
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}>{title}</Text>
        </View>

        <ScrollView style={styles.content} showVerticalScrollIndicator={false}>
          <Text style={styles.contentText}>{content}</Text>
        </ScrollView>
      </View>
    </>
  );
}

export default HelpComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // paddingTop: 15,
  },
  top: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderBottomWidth: 0.7,
    borderRadius: 0.7,
    // borderBottomColor: "#918989",
    elevation: 0.7,
  },
  topText: {
    color: "#696969",

    fontSize: 18,
  },
  content: {
    padding: 10,
    paddingLeft: 14,
  },
  contentText: {
    fontSize: 15,
  },
});
