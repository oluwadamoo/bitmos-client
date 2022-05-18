import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { UIActivityIndicator } from "react-native-indicators";

import axios from "axios";
import WebView from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";

const SuccessScreen = ({ route, navigation }) => {
  const data = route.params.data;
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [payWithCard, setPayWithCard] = useState(true);
  const [payWithWallet, setPayWithWallet] = useState(false);
  const [openPaystack, setOpenPaystack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paystackUri, setPaystackUri] = useState();
  const user = useSelector((state) => state.user);

  const token = user?.userData.token;
  const header = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: 710,
  };

  const setPayOption = (option) => {
    if (option == "card") {
      setPayWithCard(true);
      setPayWithWallet(false);
    } else if (option == "wallet") {
      setPayWithCard(false);
      setPayWithWallet(true);
    }
  };
  const proceedToPayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://backend.bitmoservice.com/api/resources/v1/client/service/make-payment",
        { order_id: data.order_id },
        { headers: header }
      );

      console.log(res.data);
      if (res.data.code == 200) {
        setOpenPaymentModal(true);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(payWithCard, "cardsss");
  console.log(payWithWallet, "wallet");

  const pay = async () => {
    setLoading(true);
    setOpenPaymentModal(false);
    let option = "pay-with-card";
    let resource_code = 712;
    if (payWithCard == true) {
      option = "pay-with-card";
      resource_code = 712;
    } else {
      option = "pay-with-wallet";
      resource_code = 711;
    }
    try {
      const res = await axios.post(
        `https://backend.bitmoservice.com/api/resources/v1/client/service/${option}`,
        { order_id: data.order_id },
        { headers: { ...header, Resource_Code: resource_code } }
      );

      // console.log(res.data.data.payment_link);
      if (res.data.data.payment_link) {
        setOpenPaystack(true);
        setLoading(false);

        setPaystackUri(res.data.data.payment_link);
      }
      console.log(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(openPaymentModal, "modal");
  return (
    <View style={styles.container}>
      {openPaystack ? (
        <>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <AntDesign name="left" size={22} color="#00709e" />
            <Text style={{ color: "#00709e" }}>Back</Text>
          </Pressable>

          <WebView source={{ uri: paystackUri }} />
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <View style={styles.top}>
              <FontAwesome name="check-circle" size={44} color="#00709e" />
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontWeight: "600",
                  fontSize: 17,
                }}
              >
                Your order was successful
              </Text>
            </View>
            <View style={styles.middle}>
              <Image
                source={require("../assets/images/resources/Blue-Man.png")}
                style={{ width: 200, height: 200, marginBottom: 40 }}
              />
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 13,
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                The servitor will be at your service just in time
              </Text>
              <Text
                style={{
                  color: "#00709e",
                  fontWeight: "600",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                From: {data.start_date}
              </Text>
              <Text
                style={{
                  color: "#00709e",
                  fontWeight: "600",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                To: {data.end_date}
              </Text>
            </View>
            <View style={styles.footer}>
              <Pressable
                onPress={proceedToPayment}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    width: Dimensions.get("screen").width - 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 15,
                    backgroundColor: "#00709e",
                  },
                ]}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: 17,
                  }}
                >
                  Proceed to payment
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={{ height: 80 }} />
        </ScrollView>
      )}
      {loading && (
        <View
          style={{
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            backgroundColor: "#08080871",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UIActivityIndicator color="#9ad4eb" />
        </View>
      )}

      {openPaymentModal && (
        <View
          style={{
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            backgroundColor: "#0000005c",
            alignItems: "center",
            position: "absolute",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <View style={styles.paymentModalContainer}>
            <Pressable
              onPress={() => setOpenPaymentModal(false)}
              style={({ pressed }) => [
                {
                  alignSelf: "flex-end",
                  height: 18,
                  width: 18,
                  borderRadius: 9,
                  backgroundColor: pressed ? "#fffeee" : "transparent",
                  borderColor: "#979797",
                  borderWidth: pressed ? 1 : 0,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 2,
                },
              ]}
            >
              <Text
                style={{
                  color: "red",
                  fontWeight: "900",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                x
              </Text>
            </Pressable>
            <Text style={{ textAlign: "center", marginBottom: 10 }}>
              Set Payment Option:{" "}
            </Text>

            <Pressable
              onPress={() => setPayOption("card")}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {payWithCard ? (
                <Pressable style={styles.radio}>
                  <View style={styles.radioSelect} />
                </Pressable>
              ) : (
                <Pressable
                  style={styles.radio}
                // onPress={() => setPayOption("card")}
                />
              )}
              <Text>Pay with Card</Text>
            </Pressable>

            <Pressable
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => setPayOption("wallet")}
            >
              {payWithWallet ? (
                <Pressable style={styles.radio}>
                  <View style={styles.radioSelect} />
                </Pressable>
              ) : (
                <Pressable style={styles.radio} />
              )}
              <Text>Pay with Wallet</Text>
            </Pressable>

            <Pressable
              onPress={pay}
              style={({ pressed }) => [
                {
                  height: 25,
                  minWidth: 30,
                  backgroundColor: "#00709e",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginTop: 90,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <Text style={{ fontWeight: "700", color: "#fff" }}>Pay</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: "relative",
  },
  wrapper: {
    marginTop: 15,
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
  },
  middle: {
    marginVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: Dimensions.get("screen").height - 650,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentModalContainer: {
    borderRadius: 8,
    padding: 15,
    position: "absolute",
    // justifyContent: "center",
    alignSelf: "center",
    minHeight: 200,
    minWidth: 200,
    // left: 100,
    top: Dimensions.get("screen").height / 3,
    elevation: 3,
    backgroundColor: "#fff",
  },
  radio: {
    height: 12,
    width: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#7a7a7a",
    marginRight: 10,
    marginVertical: 10,
  },
  radioSelect: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: "blue",
  },
});
