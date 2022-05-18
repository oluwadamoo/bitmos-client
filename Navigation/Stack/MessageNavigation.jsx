import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageScreen from "../../screens/MessagesScreen";
import SingleMessageScreen from "../../screens/SingleMessageScreen";

const Stack = createNativeStackNavigator();

export default function MessageNavigator() {
  return (
    <Stack.Navigator>
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
