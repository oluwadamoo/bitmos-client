import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "../Bottom/BottomNavigation";

import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthNavigator from "./AuthNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [myUser, setMyUser] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        let user;
        try {
          user = await AsyncStorage.getItem("@save_user");
          console.log(user, "user.............from Root NAV........");
        } catch (e) {
          console.log(e);
          alert("Failed to fetch data");
        }
        setMyUser(JSON.parse(user));
        dispatch(loginSuccess(JSON.parse(user)));
        console.log(myUser, "token....");
      } catch (e) {
        console.log(e);
      }
    };
    getUser();

    userData.userData &&
      console.log(
        userData.userData.user,
        "user data.userdata..........From Root Navigator..."
      );
  }, []);

  return (
    <>
      {myUser && myUser.token ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}
