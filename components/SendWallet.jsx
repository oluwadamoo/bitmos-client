import "react-native-get-random-values";

import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StatusBar,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Header from "./Header";
import axios from "axios";
import { WebView } from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";

import { loginSuccess } from "../redux/userSlice";

const SendWallet = ({ route, navigation }) => {
  const { hasBSID, send, request, title } = route.params;
  const [receiver_ref_code, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paystackUri, setPaystackUrl] = useState();
  const [isInitiated, setIsInitiated] = useState(false);
  const [message, setMessage] = useState();
  const [code, setCode] = useState();
  const [hasError, setHasError] = useState(false);
  const [referrorMessage, setRefErrorMessage] = useState();
  const [amterrorMessage, setErrorMessage] = useState();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const successFun = (event) => {
    if (event.url.includes("backend")) {
      navigation.goBack();
    }
    console.log(event.url);
  };
  const token = user?.userData.token;

  const validate = (field) => {
    // setErrorMessage("");
    if (field == "receiver_ref_code" && receiver_ref_code.length < 1) {
      setHasError(true);
      setRefErrorMessage("This field is required");
    } else if (field == "amount" && amount.length < 1) {
      setHasError(true);
      setErrorMessage("This field is required");
    } else if (field == "amount" && amount.length > 0) {
      setHasError(false);
      setErrorMessage("");
    } else if (field == "receiver_ref_code") {
      setHasError(false);
      setRefErrorMessage("");
    }
  };
  const sendMoney = async () => {
    console.log("GOT HERE")
    if (!hasError && amount.length > 0 && receiver_ref_code.length > 0) {
      setIsLoading(true);

      try {
        const header = {
          Authorization: `Bearer ${token}`,
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: 504,
        };

        const res = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/fund-transfer",
          { receiver_ref_code, amount },
          { headers: header }
        );

        // setBalance(res.data.data.wallet_balance);
        console.log(res.data, "SENT>>>>>>>>>>")
        setCode(res.data.code);
        switch (code) {
          case 422:
            Alert.alert("Oops!", res.data.message, [
              {
                text: "Alright I'll cross-check",
                // onPress: () => navigation.navigate("Login"),
              },
            ]);
            break;

          case 421:
            Alert.alert(
              "The Fields are required!",
              res.data.message.receiver_ref_code +
              "\n \n" +
              res.data.message.amount,
              [
                {
                  text: "Alright I'll include it",
                  // onPress: () => navigation.navigate("Login"),
                },
              ]
            );
            break;

          case 200:
            Alert.alert("Successful!", res.data.message);
            setAmount("")
            setReceiverId("")
            navigation.pop()
            break;
        }
        // console.log(res.data.code, );
        setIsLoading(false);
        // Alert.alert();
        // console.log(receiverId, amount);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    } else {
      alert("All fields are required!");
    }
  };

  const requestMoney = async () => {
    if (!hasError && amount.length > 0 && receiver_ref_code.length > 0) {
      setIsLoading(true);
      console.log("I WAS TOUCHED>>>>>>>>>>>>>>>>>")
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: 505,
        };

        const res = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/fund-request",
          { sender_ref_code: receiver_ref_code, amount },
          { headers: header }
        );

        setCode(res.data.code);
        console.log(res.data, "REQUEST MONEY OOOO")
        switch (code) {
          case 422:
            Alert.alert("Oops!", res.data.message, [
              {
                text: "Alright I'll cross-check",
                // onPress: () => navigation.navigate("Login"),
              },
            ]);
            break;

          case 421:
            Alert.alert(
              "The Fields are required!",
              res.data.message.receiver_ref_code +
              "\n \n" +
              res.data.message.amount,
              [
                {
                  text: "Alright I'll include it",
                  // onPress: () => navigation.navigate("Login"),
                },
              ]
            );
            break;

          case 200:
            Alert.alert("Successful!", res.data.message);
            setReceiverId("")
            setAmount("")
            navigation.pop()
            break;
        }
        // setBalance(res.data.data.wallet_balance);
        // console.log(res);
        setIsLoading(false);
        // console.log(receiverId, amount);
      } catch (e) {
        setIsLoading(false);
        console.log(e, "ERROR FROM REQUEST MONEY");
      }
    } else {
      alert("All fields are required!");
    }
  };

  const topUp = async () => {
    if (!hasError && amount.length > 0) {
      setIsLoading(true);

      try {
        const header = {
          Authorization: `Bearer ${token}`,
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: 500,
        };

        const res = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/fund-wallet",
          { amount, payment_type: 0 },
          { headers: header }
        );

        setCode(res.data.code);
        switch (code) {
          case 422:
            console.log(code);
            Alert.alert("Oops!", res.data.message, [
              {
                text: "Alright I'll cross-check",
                // onPress: () => navigation.navigate("Login"),
              },
            ]);
            break;

          case 421:
            console.log(code);

            Alert.alert(
              "The Fields are required!",

              res.data.message.amount,
              [
                {
                  text: "Alright I'll include it",
                  // onPress: () => navigation.navigate("Login"),
                },
              ]
            );
            break;
        }
        // setBalance(res.data.data.wallet_balance);
        // console.log(res);
        setAmount("");
        if (res.data.status == true) {
          setPaystackUrl(res.data.data);
          setIsInitiated(true);
        }

        setIsLoading(false);
        // console.log(receiverId, amount);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    } else {
      alert("Amount is required!");
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 15,
        }}
      >
        <View style={{ opacity: isInitiated ? 0 : 1 }}>
          {hasBSID && (
            <TextInput
              value={receiver_ref_code}
              onChangeText={setReceiverId}
              placeholder={send ? "BS Receiver ID" : "BS Sender ID"}
              style={{
                height: 40,
                // backgroundColor: "#f0f0f0",
                paddingHorizontal: 10,
                borderRadius: 15,
                fontSize: 15,

                // elevation: 1,
                marginVertical: 10,
              }}
              onEndEditing={() => validate("receiver_ref_code")}
            />
          )}
          {hasError && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "red",
                  marginTop: -10,
                  marginHorizontal: 10,
                }}
              >
                .
              </Text>
              <Text
                style={{ color: "red", fontFamily: "monospace", fontSize: 10 }}
              >
                {referrorMessage}
              </Text>
            </View>
          )}
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            style={{
              height: 40,
              // backgroundColor: "#f0f0f0",
              paddingHorizontal: 10,
              borderRadius: 15,
              fontSize: 15,
              // elevation: 1,
              marginVertical: 8,
            }}
            onEndEditing={() => validate("amount")}
          />
          {hasError && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "red",
                  marginTop: -10,
                  marginHorizontal: 10,
                }}
              >
                .
              </Text>
              <Text
                style={{
                  color: "red",
                  fontFamily: "monospace",
                  fontSize: 10,
                  marginBottom: 10,
                }}
              >
                {amterrorMessage}
              </Text>
            </View>
          )}
          <Pressable
            onPress={send ? sendMoney : request ? requestMoney : topUp}
            style={({ pressed }) => [
              {
                opacity: pressed && !isLoading ? 0.5 : 1,
                backgroundColor: "#317fde",
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                marginTop: 8,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {title}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      {isInitiated && (
        <WebView
          source={{ uri: paystackUri }}
          // onNavigationStateChange={(event) => successFun(event)}
          containerStyle={{
            flex: 1,
            marginTop: -(Dimensions.get("screen").height - 150),
            // position: "absolute",
            // top: 300,
          }}
        />
      )}
    </>
  );
};

export default SendWallet;
