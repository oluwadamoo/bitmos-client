import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import CategoriesCard from "../components/CategoriesCard";
import axios from "axios";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import {
  UIActivityIndicator,
} from 'react-native-indicators';

export default function SingleCategoryScreen({ route, navigation }) {
  const categoryId = route.params?.categoryId;
  const title = route.params?.title;
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const token = user?.userData.token;

  const [subCategories, setSubCategories] = React.useState([]);
  console.log(categoryId);
  const header = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: 602,
  };
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://backend.bitmoservice.com/api/resources/v1/client/sub-categories/${categoryId}`,
          { headers: header }
        );

        setSubCategories(res.data.data.sub_category_details);

        setIsLoading(false);
      } catch (e) {
        console.warn(e);
        setIsLoading(false);
      }
      //   console.log("data from sub category  ", res.data.data);
    };
    fetchSubCategories();
  }, []);
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header navigation={navigation} />

      <View style={styles.cardContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {isLoading ? (
          <View
            style={{
              height: Dimensions.get("screen").height - 250,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UIActivityIndicator color="#00709e" size={50} />

          </View>
        ) : (
          <ScrollView>
            <FlatList
              data={subCategories}
              style={[styles.cardBody, { marginBottom: 100 }]}
              numColumns={2}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item, index }) => {
                return <CategoriesCard data={item} navigation={navigation} />;
              }}
            />
            <View style={{ height: 500 }} />
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    // flex: 1,
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
    backgroundColor: "#00709e",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    borderRadius: 12,
    flexDirection: "row",
  },
  cardFooterButtonText: {
    color: "#fff",
    fontSize: 14,
    marginTop: -4,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
