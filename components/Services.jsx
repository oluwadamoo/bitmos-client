import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface props {
  title: string;
  price: string;
  navigation?: {
    navigate: Function;
  };
}
const Services = ({ title, price }: props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          width: Dimensions.get("screen").width - 130,
        }}
      >
        <FontAwesome name="cart-plus" size={24} color="#8a8485" />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: "bold",
            color: "#8a8485",
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#00709e",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          height: 30,
          width: 100,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
          NGN {price}
        </Text>
      </View>
    </Pressable>
  );
};

export default Services;
