import React from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";

const Comments = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#00709e" />

      <ScrollView style={{ padding: 14 }}>
        {/* Comments */}
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <Text style={{ fontWeight: "700", fontSize: 15 }}>
              Patterns Collectionz
            </Text>
          </View>
          <Text style={{ fontWeight: "500", marginLeft: 60 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            aperiam enim fuga obcaecati fugiat vero nisi, repellat et, debitis
            velit rem eius quas aut blanditiis. Similique assumenda cumque
            blanditiis placeat?
          </Text>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#b9b9b9",
              marginVertical: 10,
            }}
          />
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <Text style={{ fontWeight: "700", fontSize: 15 }}>
              ABC Styles
            </Text>
          </View>
          <Text style={{ fontWeight: "500", marginLeft: 60 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            aperiam enim fuga obcaecati fugiat vero nisi, repellat et, debitis
            velit rem eius quas aut blanditiis. Similique assumenda cumque
            blanditiis placeat?
          </Text>
          {/* <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#b9b9b9",
              marginVertical: 10,
            }}
          /> */}
        </View>
      </ScrollView>
      {/* Add comment footer */}
      <>
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#b9b9b9",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 10,
              }}
            />
            <TextInput
              placeholder="Leave your thoughts here..."
              multiline
              style={{
                fontSize: 14,
                marginLeft: 7,
                width: Dimensions.get("window").width - 140,
                paddingHorizontal: 5,

                maxHeight: 18,
              }}
            />
          </View>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: "#8a8a8a",
              }}
            >
              Post
            </Text>
          </Pressable>
        </View>
      </>
    </View>
  );
};

export default Comments;
