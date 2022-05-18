import { AntDesign, Octicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, Dimensions, Pressable } from "react-native";
const avatar = require("../assets/images/avatars/user-male.png");

const ServiceProviders = ({ item, navigation, id }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
          borderWidth: 0.6,
          borderColor: "#bbbdbb",
          elevation: 0.2,
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
          borderRadius: 10,
          width: Dimensions.get("screen").width / 2 + 10,
        },
      ]}
      onPress={() => navigation.push("Service Listing", { item: item, id: id })}
    >
      <View style={{ padding: 6 }}>
        <Image
          source={{
            uri: item?.partner_image?.includes("https://backend.bitmoservice.com") ? item?.partner_image : `https://backend.bitmoservice.com${item.partner_image}`,
          }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {item.partner_name}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {item.partner_business_description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 15,
            alignItems: "center",
          }}
        >
          <AntDesign name="star" size={16} color="#edde05" />
          <Text style={{ color: "#edde05", fontSize: 18, marginHorizontal: 5 }}>
            {item.rating}
          </Text>
          <Text style={{ fontSize: 18 }}>
            ({item.reviews ? item.reviews : item.noOfReviews} reviews)
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Octicons name="location" size={13} color="#ed0556" />
          <Text style={{ color: "#00709e", fontSize: 12, marginLeft: 5 }}>
            {item.address} ({item.distance})
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ServiceProviders;
