import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import CategoriesCard from "./CategoriesCard";

export default function CategoryCard({
  main_category,
  name,
  subCategory,
  img,
  navigation,
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>{name}</Text>
      </View>

      <View>
        <FlatList
          data={subCategory}
          style={styles.cardBody}
          numColumns={2}
          keyExtractor={(item) => `${item.sub_category_id}`}
          renderItem={({ item, index }) => {
            return (
              <CategoriesCard
                data={item}
                img={img}
                name={name}
                navigation={navigation}
              />
            );
          }}
        />
      </View>

      <View style={styles.cardFooter}>
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            styles.cardFooterButton,
          ]}
          onPress={() =>
            navigation.push("Category", {
              categoryId: main_category.category_id,
              title: name,
            })
          }
        >
          <Text style={styles.cardFooterButtonText}>See more</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    // elevation: 0.5,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 5,
    marginTop: 10,
  },
  cardHeader: {
    borderBottomWidth: 0.4,
    borderBottomColor: "#c5c6c7",
    padding: 5,
    marginBottom: 3,
  },
  cardHeaderText: {
    fontSize: 18,
  },
  cardBody: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  cardFooter: {
    marginTop: 5,
    borderTopWidth: 0.4,
    borderTopColor: "#c5c6c7",
    padding: 5,
  },
  cardFooterButton: {
    // backgroundColor: "#00709e",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    borderRadius: 12,
    flexDirection: "row",
  },
  cardFooterButtonText: {
    color: "#5a5959",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: -4,
  },
});
