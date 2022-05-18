import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  UIActivityIndicator,
} from 'react-native-indicators';

import { FlatList } from "react-native-gesture-handler";
import CategoryList from "../components/CategoryList";
import axios from "axios";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { categorySaved, loadingError } from "../redux/categorySlice"
export default function CategorieScreen() {
  const user = useSelector((state) => state.user);
  const token = user?.userData.token
  // user?.userData.token;
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const header = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: 600,
  };
  React.useEffect(() => {

    const fetchCategories = async () => {
      setIsLoading(true);
      try {

        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/main-categories",
          { headers: header }
        );
        setCategories(res.data.data);
        dispatch(categorySaved(res.data.data))
        setIsLoading(false);
        // console.log(res.data);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Header navigation={navigation} home={true} />
      <View style={styles.title}>
        <Text style={styles.titleText}>Categories</Text>
      </View>

      <View style={{ paddingHorizontal: 14 }}>
        {isLoading ? (
          <View
            style={{
              height: Dimensions.get("screen").height - 210,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UIActivityIndicator color="#00709e" size={50} />
          </View>
        ) : (
          categories.map((item, i) => (
            <CategoryList category={item} navigation={navigation} key={i} />
          ))
          // <FlatList
          //   data={categories}
          //   style={{ marginBottom: 100 }}
          //   showsVerticalScrollIndicator={false}
          //   keyExtractor={(item) => `${item.sub_category_id}`}
          //   renderItem={({ item, index }) => {
          //     return <CategoryList category={item} navigation={navigation} />;
          //   }}
          //   ListFooterComponent={() => {
          //     return <View style={{ height: 100, marginVertical: 50 }} />;
          //   }}
          // />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
