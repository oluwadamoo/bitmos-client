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

export default function RecoverAccountScreen() {
  const [client_email, setEmail] = useState("");
  const [email_validation_message, setEmailValidationMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const validateEmail = () => {
    if (client_email.length > 3) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const result = re.test(String(client_email).toLowerCase());
      if (result == false) {
        setEmailValidationMessage("Please enter a valid email address!");
        setIsError(true);
      } else {
        setIsError(false);
      }
    } else {
      setEmailValidationMessage("Email should be more than 3 characters!");
      setIsError(true);
    }
  };
  const handleSubmit = async () => {
    validateEmail();
    try {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const result = re.test(String(client_email).toLowerCase());
      if (result && !isError && client_email.length > 1) {
        setLoading(true);
        const headers = {
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: "302",
        };

        const response = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/fpw",
          { client_email: client_email.toLowerCase() },
          { headers: headers }
        );

        // if (response.data.message.includes("otp")) {
        //   Alert.alert("Successful!...", response.data.message);
        // } else {
        //   Alert.alert("ERROR!...", response.data.message);
        // }
        setEmail("");
        if (response.data.code == 200) {
          Alert.alert("SUCCESS!...", response.data.message, [
            {
              text: "Alright Thanks",
              onPress: () =>
                navigation.navigate("Verify Otp For Password Recovery", {
                  response: response.data.data,
                }),
            },
          ]);
        } else {
          Alert.alert("ERROR!...", response.data.message);
        }

        setLoading(false);

        console.log(response.data);
      } else {
        Alert.alert("ERROR!", "The email field is required!");
      }
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
            value={client_email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onEndEditing={validateEmail}
          />
          {isError && (
            <Text style={{ color: "red", fontFamily: "monospace" }}>
              {email_validation_message}
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
              <Text style={{ color: "#fff", fontSize: 19 }}>Recover</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
