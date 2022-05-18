import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/Auth/LoginScreen";
import RecoverAccountScreen from "../../screens/Auth/RecoverAccountScreen";
import VerifyOtpForAccountScreenEmail from "../../screens/Auth/VerifyOtpForAccountScreenEmail";
import VerifyOtpForAccountScreenPhone from "../../screens/Auth/VerifyOtpForAccountScreenPhone";
import VerifyOtpForPasswordScreen from "../../screens/Auth/VerifyOtpForPasswordScreen";
import SignUpScreen from "../../screens/Auth/SignUpScreen";
import ResetPassword from "../../screens/Auth/ResetPassword";
import HomeScreen from "../../screens/HomeScreen";

import { useSelector, useDispatch } from "react-redux";
import DrawerNavigator from "../Drawer/DrawerNavigation";
import { Text } from "react-native";
import SingleCategoryScreen from "../../screens/SingleCategoryScreen";
import BottomTabNavigator from "../Bottom/BottomNavigation";
import TermsAndPolicy from "../../screens/TermsAndPolicy";
import Welcome from "../../screens/Welcome";
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Recover Account" component={RecoverAccountScreen} />
      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen
        name="Verify Otp Sent To Email"
        component={VerifyOtpForAccountScreenEmail}
      />
      <Stack.Screen
        name="Verify Otp Sent To Phone"
        component={VerifyOtpForAccountScreenPhone}
      />
      <Stack.Screen
        name="Verify Otp For Password Recovery"
        component={VerifyOtpForPasswordScreen}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerTitle: "Create New Account" }}
      />
      <Stack.Screen
        name="Terms and Policy"
        component={TermsAndPolicy}
        options={{ headerTitle: "Terms & Policy" }}
      />
      <Stack.Screen
        name="Category"
        component={SingleCategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
