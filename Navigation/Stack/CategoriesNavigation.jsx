import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategorieScreen from "../../screens/CategorieScreen";
import SingleCategoryScreen from "../../screens/SingleCategoryScreen";
import CategoryCard from "../../components/CategoryCard";
import HomeScreen from "../../screens/HomeScreen";
import ServiceProviderScreen from "../../screens/ServiceProviderScreen";
import RequestForServiceScreen from "../../screens/RequestForServiceScreen";
import SuccessScreen from "../../screens/PaymentSuccessful"
import CatDrawerNavigator from "../Drawer/CatDrawerNavigation";
import ServiceListing from "../../screens/ServiceListing";
import PostService from "../../screens/PostService";
// import CatDrawerNavigator from "../Drawer/DrawerNavigation";

const Stack = createNativeStackNavigator();

export default function CategoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Category Navigator"
        component={CatDrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={CategorieScreen}
        options={{
          title: "Categories",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Category"
        component={SingleCategoryScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerTitleAlign: "center",
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="CatCard"
        component={CategoryCard}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Service Listing"
        component={ServiceListing}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Service"
        component={ServiceProviderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Request for Service"
        component={RequestForServiceScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Post Service"
        component={PostService}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Place order"
        component={SuccessScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
