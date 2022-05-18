import React, { useEffect } from "react";
import { View, Text, Image, Dimensions, Alert, Pressable } from "react-native";

export default function CategoriesCard({ data, navigation }) {
  // useEffect(() => {
  //   console.log("our data is ", data);
  // }, [data]);

  // console.log(data)
  return (
    <Pressable
      onPress={() => navigation.push("Service", { id: data.sub_category_id })}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          borderRadius: 10,
          // elevation: 1,
          marginHorizontal: 2,
          marginBottom: 6,
          borderBottomWidth: 0.5,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          borderColor: "#302f2f97",
          width: Dimensions.get("screen").width / 2 - 12,
        },
      ]}
    >
      <View>
        <Image
          source={{
            uri: `https://backend.bitmoservice.com/${data.img}`,
          }}
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignSelf: "center",
            width: Dimensions.get("screen").width / 2 - 16,
            height: 100,
          }}
        />
      </View>
      <View style={{ padding: 8 }}>
        <Text>{data.name}</Text>
      </View>
    </Pressable>
  );
}
