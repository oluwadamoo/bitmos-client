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
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Device from "expo-device";

import { ScrollView, TextInput } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { styles } from "./styles";

const logo = require("../../assets/images/logos/blue.png");
export default function SignUpScreen() {
  const [client_first_name, setClientName] = useState("");
  const [name_validation_message, setNameValidationMessage] = useState(
    null || ""
  );
  const [client_email, setClientEmail] = useState("");
  const [email_validation_message, setEmailValidationMessage] = useState(
    null || ""
  );
  const [client_phone_number, setClientPhone] = useState("");
  const [phone_validation_message, setPhoneValidationMessage] = useState(
    null || ""
  );
  const [client_last_name, setClientLastName] = useState("");
  const [lastname_validation_message, setLastnameValidationMessage] = useState(
    null || ""
  );
  const [password, setPassword] = useState("");
  const [password_validation_message, setPasswordValidationMessage] = useState(
    null || ""
  );
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const verifyField = (field) => {
    switch (field) {
      case "name":
        if (client_first_name.length < 1) {
          setIsError(true);
          setNameValidationMessage("The name field is compulsory!");
        } else {
          setIsError(false);
          setNameValidationMessage("");
        }
        break;
      case "lastname":
        if (client_last_name.length < 1) {
          setIsError(true);
          setLastnameValidationMessage("The last name field is compulsory!");
        } else {
          setIsError(false);
          setLastnameValidationMessage("");
        }
        break;
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
            setEmailValidationMessage("");
          }
        } else {
          setEmailValidationMessage("Email should be more than 3 characters!");
          setIsError(true);
        }
        break;
      case "phone":
        if (client_phone_number.length < 11) {
          setPhoneValidationMessage("Phone number should be 11 numbers!");
          setIsError(true);
        } else {
          setIsError(false);
          setPhoneValidationMessage("");
        }
        break;
      case "password":
        if (password.length < 1) {
          setPasswordValidationMessage("Password field is compulsory!");
          setIsError(true);
        } else if (password !== password_confirmation) {
          setPasswordValidationMessage("Password doesn't match!");
          setIsError(true);
        } else {
          setPasswordValidationMessage("");
          setIsError(false);
        }
        break;
    }
  };

  const handleRegister = async () => {
    console.log("touched...........");
    try {
      if (
        client_email.length > 0 &&
        client_phone_number.length > 10 &&
        client_first_name.length > 0 &&
        client_last_name.length > 0 &&
        password.length > 0 &&
        password == password_confirmation
      ) {
        setLoading(true);
        let device_name = Device.modelName;
        let userCredentials = {
          client_first_name,
          client_last_name,
          client_email,
          client_phone_number,

          password,
          password_confirmation,
          device_name,
        };
        let headers = {
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: "300",
        };

        const response = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/register",
          userCredentials,
          { headers: headers }
        );

        switch (response.data.code) {
          case 200:
            Alert.alert("Success!", response.data.message, [
              {
                text: "Alright Thanks",
                onPress: () =>
                  navigation.navigate("Terms and Policy", {
                    auth_token: response.data.data.auth_token,
                  }),
              },
            ]);

            console.log(response);
            setClientEmail("");
            setClientName("");
            setClientPhone("");
            setClientLastName("");
            setPassword("");
            setPasswordConfirmation("");
            setLoading(false);
            break;
          case 421:
            if (response.data.message?.client_email) {
              Alert.alert("Error!", "The Email has already been taken");

            } else if (response.data.message?.client_phone_number) {
              Alert.alert("Error!", "The Phone number has already been taken");

            }
            break;
          default:
            Alert.alert("Error!", response.data.message.toString());
            setLoading(false);
        }

        // } else {
        //   Alert.alert("Error!", response.data.message);
        // }


        setLoading(false);

        console.log(response.data);
      } else {
        Alert.alert("Fill All required fields", "All fields are required");
      }
    } catch (e) {
      console.log(e);
      Alert.alert(e.message, "Please try again...");
      setLoading(false);
    }
  };
  const navigation = useNavigation();
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
            placeholder="Your Email..."
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
            placeholder="Your First Name..."
            style={styles.authInput}
            placeholderTextColor="#303030"
            value={client_first_name}
            onChangeText={setClientName}
            onEndEditing={() => verifyField("name")}
          />
          {isError && (
            <Text style={{ color: "red", fontFamily: "monospace" }}>
              {name_validation_message}
            </Text>
          )}

          <TextInput
            placeholder="Your Last Name..."
            style={styles.authInput}
            placeholderTextColor="#303030"
            value={client_last_name}
            onChangeText={setClientLastName}
            onEndEditing={() => verifyField("lastname")}
          />
          {isError && (
            <Text style={{ color: "red", fontFamily: "monospace" }}>
              {lastname_validation_message}
            </Text>
          )}
          <TextInput
            placeholder="Phone Number"
            style={styles.authInput}
            placeholderTextColor="#303030"
            value={client_phone_number}
            onChangeText={setClientPhone}
            keyboardType="number-pad"
            onEndEditing={() => verifyField("phone")}
          />
          {isError && (
            <Text style={{ color: "red", fontFamily: "monospace" }}>
              {phone_validation_message}
            </Text>
          )}

          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#303030"
            style={styles.authInput}
            value={password}
            onChangeText={setPassword}
            onEndEditing={() => verifyField("password")}
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#303030"
            style={styles.authInput}
            value={password_confirmation}
            secureTextEntry={true}
            onChangeText={setPasswordConfirmation}
          // onEndEditing={() => verifyField("confirm")}
          />
          {/* {isError && (
            <Text style={{ color: "red", fontFamily: "monospace" }}>
              {password_validation_message}
            </Text>
          )} */}
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
              onPress={handleRegister}
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
                  // fontWeight:"500",
                }}
              >
                Sign Up
              </Text>
            </Pressable>
          )}
          {/* <Button title="Sign Up" /> */}
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

          {!isLoading && (
            <Pressable
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
              <Text
                style={{
                  color: "#fff",
                  fontSize: 19,
                  // fontWeight:"500",
                }}
              >
                Login
              </Text>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
