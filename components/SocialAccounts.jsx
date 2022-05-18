import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

const SocialAccounts = () => {
  return (
    <View>
      <Text style={{ fontSize: 20 }}>Social Accounts</Text>
      <View style={{ padding: 10 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <FontAwesome name="facebook" size={28} color="#00709e" />
          <Text
            style={{
              color: "#00709e",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 15,
            }}
          >
            Facebook
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <FontAwesome name="twitter" size={28} color="#00709e" />
          <Text
            style={{
              color: "#00709e",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 15,
            }}
          >
            Twitter
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <FontAwesome name="instagram" size={28} color="#00709e" />
          <Text
            style={{
              color: "#00709e",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 15,
            }}
          >
            Instagram
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SocialAccounts;
