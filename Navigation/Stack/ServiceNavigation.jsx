import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../../screens/FavoriteScreen";
import ServiceProviderScreen from "../../screens/ServiceProviderScreen";
import RequestForServiceScreen from "../../screens/RequestForServiceScreen";
import HomeScreen from "../../screens/HomeScreen";
// import SuccessScreen from "../../screens/SuccessScreen";
import SuccessScreen from "../../screens/PaymentSuccessful"
import PostService from "../../screens/PostService";
import PartnerDrawerNavigator from "../Drawer/PartnerDrawerNavigation";

const Stack = createNativeStackNavigator();

export default function ServiceNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite Partners"
        component={PartnerDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Partners"
        component={FavoriteScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Service Providers"
        component={ServiceProviderScreen}
        options={{
          headerTitleAlign: "center",
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
