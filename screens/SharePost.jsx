import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";

const SharePost = () => {
  return (
    <>
      <StatusBar backgroundColor="#00709e" />
      <View style={styles.container}>
        {/* Top */}
        <View style={{ flexDirection: "row", padding: 20 }}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            }}
            style={{ width: 50, height: 50 }}
          />
          <TextInput
            placeholder="Write a caption"
            multiline
            style={{
              fontSize: 18,
              marginLeft: 14,
              width: Dimensions.get("window").width - 100,
              paddingHorizontal: 8,
              maxHeight: 80,
              // minHeight: 10,
            }}
          />
        </View>
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#b9b9b9" }}
        />
        {/* Search */}
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#b9b9b9",
            marginVertical: 14,
            width: Dimensions.get("window").width - 10,
            alignSelf: "center",
            height: 40,
            borderRadius: 6,
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <FontAwesome name="search" size={24} color="#b9b9b9" />
          <TextInput
            placeholder="Search"
            style={{
              fontSize: 18,
              marginLeft: 7,
              width: Dimensions.get("window").width - 40,
              paddingHorizontal: 8,

              // minHeight: 10,
            }}
          />
        </View>
        {/* Friends */}
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 15,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: "700" }}>
              Clair's Fashion Ltd
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: "#00709e",
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                borderRadius: 5,
              },
            ]}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Send
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 15,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: "700" }}>
              Patterns Collectionz
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: "#00709e",
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                borderRadius: 5,
              },
            ]}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Send
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 15,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: "700" }}>
              ABC Styles
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: "#00709e",
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                borderRadius: 5,
              },
            ]}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Send
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default SharePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
