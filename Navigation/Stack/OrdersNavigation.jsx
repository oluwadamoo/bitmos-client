import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageRequestScreen from "../../screens/ManageRequestScreen";
import OrderHistory from "../../screens/OrderHistory";
import Request from "../../components/Request";
import DisputeScreen from "../../screens/DisputeScreen";
import MessageScreen from "../../screens/MessagesScreen";
import SingleMessageScreen from "../../screens/SingleMessageScreen";
import ReviewScreen from "../../screens/ReviewScreen";

const Stack = createNativeStackNavigator();

export default function OrdersNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={ManageRequestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="History"
        component={OrderHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Dispute"
        component={DisputeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Message"
        component={SingleMessageScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
