import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Device from "expo-device";

import { ScrollView, TextInput } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { styles } from "./styles";

const logo = require("../../assets/images/logos/blue.png");

export default function ResetPassword({ route }) {
  const [client_email, setClientEmail] = useState("");
  const [email_validation_message, setEmailValidationMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [password_validation_message, setPasswordValidationMessage] =
    useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const navigation = useNavigation();
  const reset_token = route.params?.reset_token;

  const verifyField = (field) => {
    switch (field) {
      case "email":
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
        break;


    }
  };

  const handleResetPassword = async () => {
    console.log(isError, "isError")
    console.log(client_email, "emaiError")
    console.log(password, "passwordError")
    console.log(password_confirmation, "confirmiError")
    try {
      if (
        client_email.length > 0 &&
        password.length > 0 &&
        password == password_confirmation
      ) {
        12
        setIsLoading(true);
        let userCredentials = {
          client_email,
          reset_token,
          password,
          password_confirmation,
        };
        const headers = {
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: "303",
        };
        const response = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/rpw",
          userCredentials,
          { headers: headers }
        );
        if (response.data.code == 200) {
          navigation.navigate("Login");
          Alert.alert("SUCCESS!", response.data.message, [
            {
              text: "Alright Thanks",
            },
          ]);
        } else if (response.data.code == 422) {
          Alert.alert("ERROR!", response.data.message);
        }
        setClientEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setIsLoading(false);
        console.log(response.data);
      } else {
        Alert.alert("Error", "All the fields are required!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={[styles.wrapper, { marginTop: -2 }]}
      >
        <View style={styles.authTop}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.authForm}>
          <TextInput
            placeholder="Email"
            style={styles.authInput}
            placeholderTextColor="#303030"
            value={client_email}
            onChangeText={setClientEmail}
            keyboardType="email-address"
            onEndEditing={() => verifyField("email")}
          />
          {isError && (
            <Text style={{ color: "red", fontFamily: "monospace" }}>
              {email_validation_message}
            </Text>
          )}

          <TextInput
            placeholder="Password"
            placeholderTextColor="#303030"
            style={styles.authInput}
            value={password}
            onChangeText={setPassword}
            // onEndEditing={() => verifyField("password")}
            secureTextEntry={true}

          />
          {/* {isError && (
            <Text style={{ color: "red", fontFamily: "monospace" }}>
              {password_validation_message}
            </Text>
          )} */}
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#303030"
            style={styles.authInput}
            value={password_confirmation}
            secureTextEntry={true}

            onChangeText={setPasswordConfirmation}
          />

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
              onPress={handleResetPassword}
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
              <Text style={{ color: "#fff", fontSize: 19 }}>Reset</Text>
            </Pressable>
          )}

          <View
            style={{
              width: Dimensions.get("screen").width / 2,
              height: 0.5,
              alignSelf: "center",
              marginTop: 20,
              marginBottom: -5,
              backgroundColor: "#303030",
            }}
          />

          {/* <Pressable
            onPress={() => navigation.navigate("Login")}
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
            <Text style={{ color: "#fff", fontSize: 19 }}>Login</Text>
          </Pressable> */}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
