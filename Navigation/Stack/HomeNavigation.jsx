import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "../Drawer/DrawerNavigation";
import LoginScreen from "../../screens/Auth/LoginScreen";
import AuthNavigator from "./AuthNavigation";
import ServiceNavigator from "./ServiceNavigation";
import CategoryNavigator from "./CategoriesNavigation";
import SingleCategoryScreen from "../../screens/SingleCategoryScreen";
import ServiceProviderScreen from "../../screens/ServiceProviderScreen";
import RequestForServiceScreen from "../../screens/RequestForServiceScreen";
import HomeScreen from "../../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Services"
        component={ServiceNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={SingleCategoryScreen}
        options={{ headerShown: false }}
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
        name="Logout"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
