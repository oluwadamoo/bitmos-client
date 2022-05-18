// simport { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
// import { loginCall } from "../../apiCalls";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import * as Device from "expo-device";
import axios from "axios";
import { loginStart, loginSuccess, loginError } from "../../redux/userSlice";
const logo = require("../../assets/images/logos/blue.png");

export default function LoginScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  console.log(user, "from login........");
  // const navigation = useNavigation();
  const [client_email, setClientEmail] = useState("");
  const [email_validation_message, setEmailValidationMessage] = useState(
    null || ""
  );
  const [password, setPassword] = useState("");
  const [password_validation_message, setPasswordValidationMessage] = useState(
    null || ""
  );
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);

  const STORAGE_KEY = "@save_user";
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
            setEmailValidationMessage("");
          }
        } else {
          setEmailValidationMessage("Email should be more than 3 characters!");
          setIsError(true);
        }
        break;

      case "password":
        if (password.length < 1) {
          setPasswordValidationMessage("Password field is compulsory!");
          setIsError(true);
        } else {
          setPasswordValidationMessage("");
          setIsError(false);
        }
        break;
    }
  };

  const handleLogin = async () => {
    if (isError == false && client_email.length > 0 && password.length > 0) {
      try {
        dispatch(loginStart());
        setLoading(true);
        let device_name = Device.modelName;
        let userCredentials = {
          client_email,
          password,
          device_name,
        };
        let headers = {
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: "301",
        };

        const response = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/login",
          userCredentials,
          { headers: headers }
        );
        // console.log(response.data.data.user_info, "from login..............");
        if (response.data.code == 200) {
          const user_data = {
            user: response.data.data.user_info,
            token: response.data.data.auth_token,
          };

          console.log(user_data);
          try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user_data));
            dispatch(loginSuccess(user_data));
            navigation.navigate("Root");

            alert("Login successfully.....");
          } catch (e) {
            alert("error saving data....");
          }
        } else if (response.data.code == 421) {
          dispatch(loginError());
          Alert.alert(
            "Error!",
            response.data.message.client_email[0] +
            "\n \n" +
            response.data.message.password,
            [
              {
                text: "Oops! Aiit",
              },
            ]
          );
        } else if (response.data.code == 401) {
          dispatch(loginError());
          Alert.alert(
            "Error!",
            "Invalid credentials..\nCheck your credentials and try again!",
            [
              {
                text: "Oops! Aiit",
              },
            ]
          );
        }
        setClientEmail("");

        setPassword("");

        setLoading(false);

        console.log(response.data);
      } catch (e) {
        dispatch(loginError());
        console.log(e);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
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
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#303030"
            style={styles.authInput}
            value={password}
            onChangeText={setPassword}
            onEndEditing={() => verifyField("email")}
          />
          {isError && (
            <Text style={{ color: "red", fontFamily: "monospace" }}>
              {password_validation_message}
            </Text>
          )}
          {isLoading ? (
            <Pressable
              onPress={handleLogin}
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
              onPress={handleLogin}
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
                Login
              </Text>
            </Pressable>
          )}
          {/* <Button title="Login" /> */}
          {!isLoading && (
            <>
              <Pressable
                onPress={() => navigation.navigate("SignUp")}
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

              <View style={{ marginTop: 20, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>OR</Text>

                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18 }}>Forgotten Password?</Text>
                  <Pressable
                    onPress={() => navigation.navigate("Recover Account")}
                  >
                    <Text
                      style={{ fontSize: 18, marginLeft: 8, color: "#0000ee" }}
                    >
                      Reset here
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
