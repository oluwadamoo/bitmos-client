import React from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import Header from "../components/Header";

const TribeProfile = ({ navigation }) => {
  return (
    <View>
      <StatusBar backgroundColor="#00709e" />
      <Header navigation={navigation} />
      <ScrollView>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            }}
            style={{ width: 70, height: 70, borderRadius: 35, marginRight: 15 }}
          />
          <View>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>
              Sonia Fashion Styles
            </Text>
            <Text style={{ fontWeight: "500", color: "#919191" }}>
              Plot 2 Ikare Road, Lagos
            </Text>
            <Text style={{ fontWeight: "600", color: "#919191" }}>
              2,500 Followers
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "500" }}>Rating</Text>
              <Text style={{ fontWeight: "500" }}>5.0</Text>
              <Text style={{ fontWeight: "500" }}>256 reviews</Text>
            </View>
          </View>
        </View>

        <View
          style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
        >
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                width: Dimensions.get("screen").width / 2 - 20,
                backgroundColor: "#00709e",
                height: 28,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              },
            ]}
          >
            <Text style={{ fontWeight: "600", color: "#fff" }}>
              View Catalog
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                width: Dimensions.get("screen").width / 2 - 20,
                borderColor: "#00709e",
                borderWidth: 1,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 7,
                borderRadius: 10,
              },
            ]}
          >
            <Text style={{ fontWeight: "600", color: "#00709e" }}>
              Follow
            </Text>
          </Pressable>
        </View>

        {/* Suggested...... */}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#9e9b9b",

              marginVertical: 15,
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              width: Dimensions.get("screen").width / 2.5,
              marginHorizontal: 7.5,
            }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                marginRight: 15,
              }}
            />
            <Text>Sonia Fashion Styles</Text>

            <View style={{ marginTop: 40, marginBottom: 3 }}>
              <Text>5.0 (630 reviews)</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                {
                  alignSelf: "center",
                  opacity: pressed ? 0.5 : 1,
                  width: Dimensions.get("screen").width / 3,
                  borderColor: "#00709e",
                  borderWidth: 1,
                  height: 28,
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: 10,
                },
              ]}
            >
              <Text style={{ fontWeight: "600", color: "#00709e" }}>
                Follow
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#9e9b9b",

              marginVertical: 15,
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              width: Dimensions.get("screen").width / 2.5,
              marginHorizontal: 7.5,
            }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                marginRight: 15,
              }}
            />
            <Text>Sonia Fashion Styles</Text>

            <View style={{ marginTop: 40, marginBottom: 3 }}>
              <Text>5.0 (630 reviews)</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                {
                  alignSelf: "center",
                  opacity: pressed ? 0.5 : 1,
                  width: Dimensions.get("screen").width / 3,
                  borderColor: "#00709e",
                  borderWidth: 1,
                  height: 28,
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: 10,
                },
              ]}
            >
              <Text style={{ fontWeight: "600", color: "#00709e" }}>
                Follow
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#9e9b9b",

              marginVertical: 15,
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              width: Dimensions.get("screen").width / 2.5,
              marginHorizontal: 7.5,
            }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                marginRight: 15,
              }}
            />
            <Text>Sonia Fashion Styles</Text>

            <View style={{ marginTop: 40, marginBottom: 3 }}>
              <Text>5.0 (630 reviews)</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                {
                  alignSelf: "center",
                  opacity: pressed ? 0.5 : 1,
                  width: Dimensions.get("screen").width / 3,
                  borderColor: "#00709e",
                  borderWidth: 1,
                  height: 28,
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: 10,
                },
              ]}
            >
              <Text style={{ fontWeight: "600", color: "#00709e" }}>
                Follow
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#9e9b9b",

              marginVertical: 15,
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              width: Dimensions.get("screen").width / 2.5,
              marginHorizontal: 7.5,
            }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                marginRight: 15,
              }}
            />
            <Text>Sonia Fashion Styles</Text>

            <View style={{ marginTop: 40, marginBottom: 3 }}>
              <Text>5.0 (630 reviews)</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                {
                  alignSelf: "center",
                  opacity: pressed ? 0.5 : 1,
                  width: Dimensions.get("screen").width / 3,
                  borderColor: "#00709e",
                  borderWidth: 1,
                  height: 28,
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: 10,
                },
              ]}
            >
              <Text style={{ fontWeight: "600", color: "#00709e" }}>
                Follow
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#9e9b9b",

              marginVertical: 15,
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              width: Dimensions.get("screen").width / 2.5,
              marginHorizontal: 7.5,
            }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                marginRight: 15,
              }}
            />
            <Text>Sonia Fashion Styles</Text>

            <View style={{ marginTop: 40, marginBottom: 3 }}>
              <Text>5.0 (630 reviews)</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                {
                  alignSelf: "center",
                  opacity: pressed ? 0.5 : 1,
                  width: Dimensions.get("screen").width / 3,
                  borderColor: "#00709e",
                  borderWidth: 1,
                  height: 28,
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: 10,
                },
              ]}
            >
              <Text style={{ fontWeight: "600", color: "#00709e" }}>
                Follow
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        {/* Cards........... */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: 10,
          }}
        >
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1, marginBottom: 10 },
            ]}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: Dimensions.get("screen").width / 2.2,
                height: 180,
              }}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1, marginBottom: 10 },
            ]}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: Dimensions.get("screen").width / 2.2,
                height: 180,
              }}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1, marginBottom: 10 },
            ]}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: Dimensions.get("screen").width / 2.2,
                height: 180,
              }}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1, marginBottom: 10 },
            ]}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: Dimensions.get("screen").width / 2.2,
                height: 180,
              }}
            />
          </Pressable>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* <Pressable
        // onPress={() => navigation.navigate("Share Post")}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            // position: "fixed",
            right: 20,

            bottom: 50,
            position: "absolute",
            height: 36,
            width: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00709e",
            elevation: 100,
          },
        ]}
      >
        <Entypo name="plus" size={28} color="#fff" />
      </Pressable> */}
    </View>
  );
};

export default TribeProfile;
