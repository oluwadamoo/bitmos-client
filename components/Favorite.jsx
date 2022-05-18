import { Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const avatar = require("../assets/images/avatars/user-male.png");

export default function FavoriteScreen({ navigation, partner }) {
  console.log(
    partner.partner_image,
    ".partner.................................."
  );
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={() => navigation.push("Request for Service", { item: partner })}
    >
      <View style={styles.wrapper}>
        <View style={styles.left}>
          <View style={styles.leftImgContainer}>
            <Image
              source={{
                uri: `https://backend.bitmoservice.com/design_image/avatar7.png`,
              }}
              style={styles.leftImg}
            />
          </View>
          <View style={styles.leftText}>
            <Text style={styles.leftTextName}>{partner.partner_name}</Text>
            <Text style={styles.leftTextCategory}>Agriculture</Text>
            <Text style={styles.leftTextService}>Service Type</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Ionicons name="close-outline" size={30} color="#757876" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 7,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftImgContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bbbdbb",
    marginRight: 15,
  },
  leftImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  leftText: {},
  leftTextName: {
    fontSize: 18,
    fontWeight: "600",
  },
  leftTextCategory: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444544",
  },
  leftTextService: {
    fontSize: 12,
    color: "#757876",
    fontWeight: "600",
  },
  right: {},
});
