import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageScreen from "../../screens/MessagesScreen";
import SingleMessageScreen from "../../screens/SingleMessageScreen";
import Tribe from "../../screens/Tribe";
import SharePost from "../../screens/SharePost";
import Comments from "../../screens/Comments";
import TribeProfile from "../../screens/TribeProfile";
import TribeDrawerNavigator from "../Drawer/TribeDrawerNavigation";

const Stack = createNativeStackNavigator();

export default function TribeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tribe Draw Nav"
        component={TribeDrawerNavigator}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Messages"
        component={Tribe}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Share Post"
        component={SharePost}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Comment"
        component={Comments}
        options={{
          //   headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Tribe Profile"
        component={TribeProfile}
        options={{
          title: "Sonia Fashion Styles",
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
