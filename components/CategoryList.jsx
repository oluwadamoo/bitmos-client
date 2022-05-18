import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";

export default function CategoryList({ category, navigation }) {
  return (
    <Pressable
      onPress={() =>
        navigation.push("Category", {
          categoryId: category.main_category_id,
          title: category.name,
        })
      }
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 8,
        },
      ]}
    >
      <View style={{ marginRight: 20 }}>
        <Image
          source={{ uri: `https://backend.bitmoservice.com/${category.img}` }}
          style={{ width: 45, aspectRatio: 1.8 / 2, borderRadius: 5 }}
        />
      </View>
      <Text style={{ fontSize: 18 }}>{category.name}</Text>
    </Pressable>
  );
}
