import axios from "axios";
import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/core";

const logo = require("../../assets/images/logos/blue.png");

export default function VerifyOtpForPasswordScreen({ route }) {
  const [otp, setOtp] = useState("");
  const [otp_validation_message, setOtpValidationMessage] = useState(
    null || ""
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const verify = () => {
    if (otp.length < 2) {
      setOtpValidationMessage("This field is compulsory!");
    } else if (otp.length < 6) {
      setOtpValidationMessage("Please enter the Otp sent to your email!");
    }
  };

  const data = route.params?.response;
  let client_email = data.client_email;
  let reset_token = data.reset_token;
  const handleSubmit = async () => {
    try {
      if (client_email && !isError) {
        setIsLoading(true);

        const headers = {
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: "304",
        };
        const response = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/verify-otp-for-fpw",
          { client_email, otp },
          { headers: headers }
        );
        if (response.data.code == 200) {
          navigation.navigate("Reset Password", { reset_token: reset_token });
        } else if (response.data.code == 422) {
          Alert.alert("Error!", response.data.message);
        }

        setIsLoading(false);
        console.log(response);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
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
            placeholder="Enter Otp"
            style={styles.authInput}
            placeholderTextColor="#303030"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            onEndEditing={verify}
          />
          {isError && (
            <Text style={{ color: "red", fontFamily: "monospace" }}>
              {otp_validation_message}
            </Text>
          )}
          {isLoading ? (
            <Pressable
              style={{
                backgroundColor: "#00709e",
                height: 38,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
                marginTop: 20,
              }}
            >
              <ActivityIndicator color="#fff" />
            </Pressable>
          ) : (
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
                Verify
              </Text>
            </Pressable>
          )}

          {/* <Button title="Login" /> */}
        </View>
      </View>
    </View>
  );
}
