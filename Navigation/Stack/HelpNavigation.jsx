import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HelpScreen from "../../screens/HelpScreen";
import HelpComponent from "../../components/HelpComponent";

const Stack = createNativeStackNavigator();

export default function HelpNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Help Screen"
        component={HelpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Help Component"
        component={HelpComponent}
        options={({ route }) => ({
          headerShown: false,
          //   title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
}
