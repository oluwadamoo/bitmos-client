import {
  FontAwesome,
  FontAwesome5,
  Foundation
} from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import TransactionHistory from "../components/TransactionHistory";
import {
  UIActivityIndicator,
} from 'react-native-indicators';

const showSmtn = () => { };
const WalletScreen = ({ navigation }) => {
  //   const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const token = user?.userData.token;
  const [balance, setBalance] = React.useState();
  const [transactions, setTransactions] = React.useState([]);
  const [topupTransactions, setTopupTransactions] = React.useState([]);
  const [transferTransactions, setTransferTransactions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTopup, setIsTopup] = React.useState(true);
  const [isTransfer, setIsTransfer] = React.useState(false);
  const [topup, setTopup] = React.useState()
  const [transfers, setTransfers] = React.useState()
  React.useEffect(() => {
    const header = {
      Authorization: `Bearer ${token}`,
      Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
      App_No: "07fix32665",
      Resource_Code: 503,
    };

    const fetchBalance = async () => {
      setIsLoading(true);
      //   // console.log("...loading......");
      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/wallet-balance",
          { headers: header }
        );

        setBalance(res.data.data.wallet_balance);
        //     // console.log(res);
        setIsLoading(false);
        //     // console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchTopupTransactions = async () => {
      setIsLoading(true);
      const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 501,
      };
      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/deposit-history",
          { headers: header }
        );
        console.log(res.data, "topup...");
        // setTransactions(res.data.data.funds);
        setTopupTransactions(res.data.data.deposits);
        // console.log(transactions);
        setTopup(res.data.data)
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    };
    const fetchTransferTransactions = async () => {
      setIsLoading(true);
      const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 508,
      };
      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/funding-history",
          { headers: header }
        );
        console.log(res.data.data.funds, "transfer");
        // setTransactions(res.data.data.funds);
        setTransferTransactions(res.data.data.funds);
        setTransfers(res.data.data)
        // console.log(transactions);

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    };

    fetchBalance();
    fetchTopupTransactions();
    fetchTransferTransactions();
  }, []);

  const changeHistoryColumn = (type) => {
    if (type == "topup") {
      setIsTopup(true);
      setIsTransfer(false);
    } else if (type == "transfer") {
      setIsTopup(false);
      setIsTransfer(true);
    }
  };

  const gotoTopupUrl = async (url) => {
    setIsLoading(true);
    const header = {
      Authorization: `Bearer ${token}`,
      Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
      App_No: "07fix32665",
      Resource_Code: 501,
    };
    try {
      const res = await axios.get(
        url,
        { headers: header }
      );
      // console.log(res.data, "topup...");
      // setTransactions(res.data.data.funds);
      setTopupTransactions(res.data.data.deposits);
      // console.log(transactions);
      setTopup(res.data.data)
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }
  const gotoTransferUrl = async (url) => {
    setIsLoading(true);
    const header = {
      Authorization: `Bearer ${token}`,
      Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
      App_No: "07fix32665",
      Resource_Code: 508,
    };
    try {
      const res = await axios.get(
        "https://backend.bitmoservice.com/api/resources/v1/client/funding-history",
        { headers: header }
      );
      console.log(res.data.data.funds, "transfer");
      // setTransactions(res.data.data.funds);
      setTransferTransactions(res.data.data.funds);
      setTransfers(res.data.data)
      // console.log(transactions);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }

  }
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header navigation={navigation} home={true} />

      {isLoading ? (
        <View style={{ marginTop: Dimensions.get("screen").height / 2.5 }}>
          <UIActivityIndicator color={"#00709e"} />
        </View>
      ) : (
        <View>
          <View style={{ padding: 10, }} >
            <View
              style={{
                backgroundColor: "#317fde",
                minHeight: 180,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 15,
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
                NGN {balance}
              </Text>
              <Text style={{ color: "#adadad", fontSize: 15 }}>
                Available Balance
              </Text>
              <View
                style={{
                  height: 0.5,
                  backgroundColor: "#adadad",
                  marginVertical: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 5,
                }}
              >
                <Pressable
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() =>
                    navigation.navigate("Send Wallet", {
                      title: "Send Money",
                      hasBSID: true,
                      send: "send",
                    })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 50,
                      height: 40,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome name="send" size={30} color="#317fde" />
                  </View>
                  <Text style={{ fontWeight: "700", color: "#fff" }}>
                    Send Money
                  </Text>
                </Pressable>

                <Pressable
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() =>
                    navigation.navigate("Send Wallet", {
                      title: "Request Money",
                      hasBSID: true,
                      request: "request",
                    })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 50,
                      height: 40,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome5
                      name="hand-holding-usd"
                      size={30}
                      color="#317fde"
                    />
                  </View>
                  <Text style={{ fontWeight: "700", color: "#fff" }}>
                    Request Money
                  </Text>
                </Pressable>

                <Pressable
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() =>
                    navigation.navigate("Send Wallet", { title: "Top Up" })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 50,
                      height: 40,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome name="bank" size={30} color="#317fde" />
                  </View>
                  <Text style={{ fontWeight: "700", color: "#fff" }}>
                    Top Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 12, backgroundColor: "#fff" }}>
            <Text style={{ fontWeight: "700", fontSize: 15, color: "#454545" }}>
              Transaction History
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Pressable
                onPress={() => changeHistoryColumn("topup")}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: isTopup ? 2 : 0,
                  borderBottomColor: "#00709e",
                  width: Dimensions.get("screen").width / 3,
                  padding: 5,
                }}
              >
                <Text style={{ fontSize: 16 }}>Topup</Text>
              </Pressable>
              <Pressable
                onPress={() => changeHistoryColumn("transfer")}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: isTransfer ? 2 : 0,
                  borderBottomColor: "#00709e",
                  width: Dimensions.get("screen").width / 3,
                  padding: 5,
                }}
              >
                <Text style={{ fontSize: 16 }}>Transfer</Text>
              </Pressable>
            </View>
            <View style={{ justifyContent: "space-between" }}>
              <ScrollView showsVerticalScrollIndicator={false} style={{ height: Dimensions.get("screen").height / 3 }}>
                {isTopup
                  ? topupTransactions?.map((transaction, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                        alignItems: "center",
                      }}
                    >
                      <TransactionHistory transaction={transaction} navigation={navigation} />
                    </View>
                  ))
                  : transferTransactions.map((transaction, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                        alignItems: "center",
                      }}
                    >
                      <TransactionHistory transaction={transaction} navigation={navigation} />
                    </View>
                  ))}


                {/* <View style={{ height: 500 }} /> */}
              </ScrollView>
              {isTopup ?
                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", width: '100%', paddingHorizontal: 10 }}>
                  {!topup.prev_page_url && <View />}
                  {topup.prev_page_url && <Pressable onPress={() => gotoTopupUrl(topup.prev_page_url)} style={({ pressed }) => [{ opacity: pressed ? .5 : 1, flexDirection: 'row', alignItems: 'center' }]}><Foundation name="previous" size={24} color="#00709e" /><Text style={{ marginLeft: 5, fontSize: 13, fontWeight: '700', color: '#00709e' }}>Prev</Text></Pressable>}
                  <Text>{topup?.page_description}</Text>
                  {topup.next_page_url && <Pressable onPress={() => gotoTopupUrl(topup.next_page_url)} style={({ pressed }) => [{ opacity: pressed ? .5 : 1, flexDirection: 'row', alignItems: 'center' }]}><Text style={{ marginRight: 5, fontSize: 13, fontWeight: '700', color: '#00709e' }}>Next</Text><Foundation name="next" size={24} color="#00709e" /></Pressable>}
                  {!topup.next_page_url && <View />}

                </View> :
                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", width: '100%' }}>
                  {!transfers.prev_page_url && <View />}
                  {transfers.prev_page_url && <Pressable onPress={() => gotoTransferUrl(transfers.prev_page_url)} style={({ pressed }) => [{ opacity: pressed ? .5 : 1, flexDirection: 'row', alignItems: 'center' }]}><Foundation name="previous" size={24} color="#00709e" /><Text style={{ marginLeft: 5, fontSize: 13, fontWeight: '700', color: '#00709e' }}>Prev</Text></Pressable>}
                  <Text>{transfers?.page_description}</Text>
                  {transfers.next_page_url && <Pressable onPress={() => gotoTransferUrl(transfers.next_page_url)} style={({ pressed }) => [{ opacity: pressed ? .5 : 1, flexDirection: 'row', alignItems: 'center' }]}><Text style={{ marginRight: 5, fontSize: 13, fontWeight: '700', color: '#00709e' }}>Next</Text><Foundation name="next" size={24} color="#00709e" /></Pressable>}
                  {!transfers.next_page_url && <View />}

                </View>
              }
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default WalletScreen;
