import React, { useEffect } from "react";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import { View, Image, Text, Pressable, Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/Auth/LoginScreen";
import AccountScreen from "../../screens/AccountScreen";
import ManageRequestScreen from "../../screens/ManageRequestScreen";
import MessagesScreen from "../../screens/MessagesScreen";
import WalletScreen from "../../screens/WalletScreen";
import PostServiceScreen from "../../screens/PostService";

import WalletNavigator from "../Stack/WalletNavigation";
import MessageNavigator from "../Stack/MessageNavigation";
import AuthNavigator from "../Stack/AuthNavigation";
import HelpNavigator from "../Stack/HelpNavigation";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HelpScreen from "../../screens/HelpScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import InviteScreen from "../../screens/InviteScreen";
import FeedbackScreen from "../../screens/FeedbackScreen";
import { useNavigation } from "@react-navigation/core";
import CategorieScreen from "../../screens/CategorieScreen";
import Tribe from "../../screens/Tribe";
const DrawHeader = () => {
  const user = useSelector((state) => state.user);
  // console.log(user?.userData.user);
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Home")}
      style={{ width: "100%" }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Image
          source={user?.userData?.user?.profile_photo ? { uri: user?.userData?.user?.profile_photo } : require("../../assets/images/avatars/male_avatar.png")}
          style={{ height: 44, width: 44, borderRadius: 22 }}
        />
        {user?.userData && (
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#706f6f" }}>
              {user?.userData?.user?.first_name} {user?.userData?.user?.last_name}
            </Text>
            <Text>
              BS.ID: {user?.userData?.user && user?.userData?.user?.ref_no}
            </Text>
          </View>
        )}
      </View>
      <View style={{ height: 0.7, backgroundColor: "#706f6f", marginTop: 5 }} />
    </Pressable>
  );
};

const LogoutIcon = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logoutFunction = async () => {
    try {
      const done = await AsyncStorage.removeItem("@save_user");

      dispatch(logout());

      Alert.alert(".", "logout successfully", [
        {
          title: "OK",
          onPress: () => navigation.push("Logout"),
        },
      ]);
    } catch (e) {
      alert("Failed to logout");
      console.log(e);
    }
  };

  return (
    <Pressable
      onPress={() => logoutFunction()}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          opacity: pressed ? 0.5 : 1,
          width: "100%",
          alignItems: "center",
        },
      ]}
    >
      <MaterialCommunityIcons name="logout" color="red" size={24} />
      <Text style={{ marginLeft: 30, color: "#706f6f" }}>Logout</Text>
    </Pressable>
  );
};
const Drawer = createDrawerNavigator();

export default function TribeDrawerNavigator() {
  const color = "#486d7c";

  const size = 24;
  return (
    <Drawer.Navigator initialRouteName="Tribe">
      <Drawer.Screen
        name="Tribe"
        component={Tribe}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={AuthNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ navigation }) => (
            <LogoutIcon navigation={navigation} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,

          drawerIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Manage Request"
        component={ManageRequestScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="email-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Inbox"
        component={MessageNavigator}
        options={{
          headerShown: false,

          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="wallet-travel"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Wallet Stack"
        component={WalletNavigator}
        options={{
          title: "Wallet",
          headerShown: false,
          drawerIcon: ({ color }) => (
            <SimpleLineIcons name="wallet" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Post a service"
        component={PostServiceScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Feather name="edit" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerShown: false,

          drawerIcon: ({ color }) => (
            <SimpleLineIcons name="pencil" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Invite Friends"
        component={InviteScreen}
        options={{
          headerShown: false,

          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="send" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,

          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpNavigator}
        options={{
          headerShown: false,

          drawerIcon: ({ color }) => (
            <Feather name="help-circle" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
