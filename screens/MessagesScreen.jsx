import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

const maleAvatar = require("../assets/images/avatars/male_avatar.png");
const femaleAvatar = require("../assets/images/avatars/female_avatar.png");

// import { useNavigation } from "@react-navigation/core";
import Header from "../components/Header";

export default function MessageScreen({ navigation }) {
  // const navigation = useNavigation();
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate("Message")}
          style={({ pressed }) => [
            styles.messages,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <View style={styles.left}>
            <Image source={maleAvatar} style={styles.leftImage} />
            <View style={styles.leftInfo}>
              <Text style={styles.leftInfoName}>Frank Idoho</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: Dimensions.get("screen").width / 4,
                  justifyContent: "space-around",
                }}
              >
                <Ionicons name="time-outline" size={12} color="black" />
                <Text style={{ fontWeight: "500" }}>Just now</Text>
                <View
                  style={{
                    height: 15,
                    width: 18,
                    borderRadius: 9,
                    backgroundColor: "#00709e",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#fff" }}>0</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.right}>
            <Text>Mon 30, 2021</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Message")}
          style={({ pressed }) => [
            styles.messages,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <View style={styles.left}>
            <Image source={femaleAvatar} style={styles.leftImage} />
            <View style={styles.leftInfo}>
              <Text style={styles.leftInfoName}>Mary Uchechi</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: Dimensions.get("screen").width / 4,
                  justifyContent: "space-around",
                }}
              >
                <Ionicons name="time-outline" size={12} color="black" />
                <Text style={{ fontWeight: "500" }}>Just now</Text>
                <View
                  style={{
                    height: 15,
                    width: 18,
                    borderRadius: 9,
                    backgroundColor: "#00709e",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#fff" }}>0</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <Text>Mon 30, 2021</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  messages: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    elevation: 4,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  leftInfo: {},
  leftInfoName: {
    fontSize: 20,
    fontWeight: "800",
  },
  right: {},
  rightText: {
    fontWeight: "600",
  },
});
