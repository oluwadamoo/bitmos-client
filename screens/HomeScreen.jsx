import axios from "axios";
import * as React from "react";

import {
  Dimensions,
  StyleSheet,

  View,
  ScrollView,

  ActivityIndicator,

} from "react-native";
import {
  UIActivityIndicator,
} from 'react-native-indicators';

import Carousel from "../components/Carousel";

import CategoryCard from "../components/CategoryCard";

import Header from "../components/Header";

import { useSelector } from "react-redux";
export default function HomeScreen({ navigation, route }) {
  const user = useSelector((state) => state.user);
  console.log(user.userData.token)

  // const token = "fgfgertere";

  const [categories, setCategories] = React.useState();
  const [categoriesStore, setCategoriesStore] = React.useState(null || []);
  const [isLoading, setIsLoading] = React.useState(false);

  var store;

  React.useEffect(() => {
    const fetchCategories = async () => {
      const token = user?.userData.token;
      const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 603,
      };

      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/home-view-categories",
          { headers: header }
        );
        store = res.data.data;
        setCategories(res.data.data);
        setIsLoading(false);
        store = Object.keys(store);

        setCategoriesStore(store);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCategories();
  }, [user?.userData]);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} home={true} />

      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 5 }}>
        <Carousel />
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
          <View>
            {categoriesStore.map((category, index) => (
              <CategoryCard
                name={categories[category]["main_category_details"].name}
                // categoryId={category?.main_category_id}
                main_category={categories[category]["main_category_details"]}
                subCategory={
                  categories[category][`${category}_sub_category_details`]
                }
                key={index}
                navigation={navigation}
              />
            ))}
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontWeight: "600",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
