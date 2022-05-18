import axios from "axios";
import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/core";

const logo = require("../../assets/images/logos/blue.png");

export default function VerifyOtpForAccountScreenEmail({ route }) {
  const [otp, setOtp] = useState("");
  const [otp_validation_message, setOtpValidationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const auth_token = route.params?.auth_token;

  const verify = () => {
    if (otp.length < 6) {
      setOtpValidationMessage("Please enter the Otp sent to your email!");
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handleSubmit = async () => {
    if (isError == false && otp.length > 0) {
      setIsLoading(true);
      const headers = {
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: "306",
        Authorization: `Bearer ${auth_token}`,
      };

      // console.log(otp, "OTP")
      try {
        const response = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/verify-otp",
          { otp: otp },
          { headers: headers }
        );
        if (response.data.code == 200) {
          Alert.alert("Success!", response.data.message, [
            {
              text: "Alright Thanks",
              onPress: () =>
                navigation.push("Login")
            },
          ]);
        } else if (response.data.code == 422) {
          Alert.alert("Error!", response.data.message);
        }
        setIsLoading(false);
        setOtp("");
        console.log(response.data);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    } else {
      Alert.alert("ERROR!", "The otp field is required!");
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
            placeholder="Otp"
            style={styles.authInput}
            placeholderTextColor="#303030"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            onEndEditing={verify}
          />
          {isError && (
            <Text style={{ fontFamily: "monospace", color: "red" }}>
              {otp_validation_message}
            </Text>
          )}

          {isLoading ? (
            <Pressable
              style={{
                opacity: 1,
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
                VERIFY OTP
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
