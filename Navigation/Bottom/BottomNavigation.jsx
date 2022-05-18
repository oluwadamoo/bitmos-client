import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

import ServiceNavigator from "../Stack/ServiceNavigation";
import CategoryNavigator from "../Stack/CategoriesNavigation";
import SellScreen from "../../screens/SellScreen";




import HomeNavigator from "../Stack/HomeNavigation";
import TribeNavigator from "../Stack/TribeNavigator";
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const size = 24;
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
        },

        // tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CategoryNav"
        component={CategoryNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Category",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-checkbox"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tribe"
        component={TribeNavigator}
        options={{
          tabBarLabel: "Tribe",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={ServiceNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Request Service"
        component={SellScreen}
        options={{
          headerShown: false,
          title: "Post A Service",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
