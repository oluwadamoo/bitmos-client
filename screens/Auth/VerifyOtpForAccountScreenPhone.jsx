import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/core";

const logo = require("../../assets/images/logos/blue.png");

export default function VerifyOtpForAccountScreenPhone({ route }) {
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();

  const auth_token = route.params?.auth_token;
  const resendHeaders = {
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: "305",
    Authorization: `Bearer ${auth_token}`,
  };
  useEffect(() => {
    const resendOtp = async () => {
      try {
        const response = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/verify-otp",
          otp,
          { headers: resendHeaders }
        );

        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    resendOtp();
  }, []);

  const handleSubmit = async () => {
    const headers = {
      Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
      App_No: "07fix32665",
      Resource_Code: "306",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        "https://backend.bitmoservice.com/api/resources/v1/client/verify-otp",
        otp,
        { headers: headers }
      );
      navigation.navigate("Login");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { marginTop: -10 }]}>
        <View style={styles.authTop}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.authForm}>
          <TextInput
            placeholder="Email"
            style={styles.authInput}
            placeholderTextColor="#303030"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />

          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: "#00709e",
                height: 38,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 19,
                fontWeight: "500",
              }}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
