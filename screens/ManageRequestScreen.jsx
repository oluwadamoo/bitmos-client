import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import Request from "../components/Request";
import { useSelector } from "react-redux";
import axios from "axios";
import { UIActivityIndicator } from "react-native-indicators";

const ManageRequestScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openApproved, setOpenApproved] = useState(false);
  const [openPending, setOpenPending] = useState(false);
  const [openUnApproved, setOpenUnApproved] = useState(false);
  const [openConfirmed, setOpenConfirmed] = useState(false);
  const [openTerminated, setOpenTerminated] = useState(false);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [unApprovedRequests, setUnApprovedRequests] = useState([]);
  const [terminatedRequests, setTerminatedRequests] = useState([]);
  const [confirmedRequests, setConfirmedRequests] = useState([]);

  const user = useSelector((state) => state.user);

  const token = user?.userData.token;

  const headers = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: "714",
  };

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/approved-order",
          { headers: headers }
        );
        // console.log(res.data, "approved..");
        // console.log("==============================");
        setApprovedRequests(res.data.data);
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        console.log(e);
      }
    };
    const fetchPendingOrders = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/pending-order",
          { headers: { ...headers, Resource_Code: 713 } }
        );
        // console.log(res.data.data, "pending...");
        // console.log("==============================");
        setPendingRequests(res.data.data);
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        console.log(e);
      }
    };
    const fetchUnApprovedOrders = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/unapproved-order",
          { headers: { ...headers, Resource_Code: 716 } }
        );
        // console.log(res.data, "ua...");
        // console.log("==============================");
        setUnApprovedRequests(res.data.data);
        setIsLoading(false)

      } catch (e) {
        setIsLoading(false)

        console.log(e);
      }
    };
    const fetchConfirmedOrders = async () => {
      setIsLoading(true)

      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/completed-order",
          { headers: { ...headers, Resource_Code: 717 } }
        );
        setConfirmedRequests(res.data.data);
        setIsLoading(false)

      } catch (e) {
        setIsLoading(false)

        console.log(e);
      }
    };
    const fetchTerminatedOrders = async () => {
      setIsLoading(true)

      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/terminated-order",
          { headers: { ...headers, Resource_Code: 719 } }
        );
        console.log(res.data.data, "tor...");
        console.log("==============================");
        setTerminatedRequests(res.data.data);
        setIsLoading(false)

      } catch (e) {
        setIsLoading(false)

        console.log(e);
      }
    };
    fetchApprovedRequests();
    fetchPendingOrders();
    fetchUnApprovedOrders();
    fetchConfirmedOrders();
    fetchTerminatedOrders();
  }, []);

  const isApproved = () => {
    if (approvedRequests.length > 0) {
      setOpenApproved(!openApproved);
    }
    setOpenPending(false);
    setOpenUnApproved(false);
    setOpenConfirmed(false);
    setOpenTerminated(false);
  };
  const isPending = () => {
    setOpenApproved(false);

    if (pendingRequests.length > 0) {
      setOpenPending(!openPending);
    }
    setOpenUnApproved(false);
    setOpenConfirmed(false);
    setOpenTerminated(false);
  };
  const isUnApproved = () => {
    setOpenApproved(false);
    setOpenPending(false);
    setOpenConfirmed(false);
    setOpenTerminated(false);
    if (unApprovedRequests.length > 0) setOpenUnApproved(!openUnApproved);
  };
  const isConfirmed = () => {
    setOpenApproved(false);
    setOpenPending(false);
    if (confirmedRequests.length > 0) setOpenConfirmed(!openConfirmed);
    setOpenTerminated(false);
    setOpenUnApproved(false);
  };
  const isTerminated = () => {
    setOpenApproved(false);
    setOpenPending(false);
    setOpenConfirmed(false);
    if (terminatedRequests.length > 0) setOpenTerminated(!openTerminated);
    setOpenUnApproved(false);
  };
  return (
    <>
      <Header navigation={navigation} home={true} />
      {isLoading ? (
        <View style={{ marginTop: Dimensions.get("screen").height / 2.5, backgroundColor: "#fff" }}>
          <UIActivityIndicator color={"#00709e"} />

        </View>) :

        <ScrollView style={styles.container}>
          {/* Approved  Request */}

          <Pressable style={styles.requestWrapper} onPress={isApproved}>
            <Text style={styles.requestHeader}>Approved Order</Text>
            <View
              style={{
                backgroundColor: "#319df7",
                height: 20,
                width: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
                {approvedRequests.length}
              </Text>
            </View>
          </Pressable>

          {openApproved && (
            <View style={{ minHeight: 280 }}>
              {approvedRequests.length > 1 &&
                <Text style={{ marginLeft: 15, marginTop: 15, color: "#787878" }}>
                  Slide to see more
                </Text>}
              <FlatList
                data={approvedRequests}
                renderItem={({ item }) => (
                  <Request
                    request={item}
                    key={item.order_id}
                    navigation={navigation}
                  />
                )}
                horizontal
              />
            </View>
          )}

          {/* Pending  Request */}
          <Pressable style={styles.requestWrapper} onPress={isPending}>
            <Text style={styles.requestHeader}>Pending Order</Text>
            <View
              style={{
                backgroundColor: "#319df7",
                height: 20,
                width: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
                {pendingRequests.length}
              </Text>
            </View>
          </Pressable>

          {openPending && (
            <View style={{ height: 280 }}>
              {pendingRequests.length > 1 && <Text style={{ marginLeft: 15, marginTop: 15, color: "#787878" }}>
                Slide to see more
              </Text>}
              <FlatList
                data={pendingRequests}
                horizontal
                renderItem={({ item }) => (
                  <Request request={item} navigation={navigation} />
                )}
              />
            </View>
          )}

          {/* UnApproved  Request */}
          <Pressable style={styles.requestWrapper} onPress={isUnApproved}>
            <Text style={styles.requestHeader}>UnApproved Request</Text>
            <View
              style={{
                backgroundColor: "#319df7",
                height: 20,
                width: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
                {unApprovedRequests.length}
              </Text>
            </View>
          </Pressable>

          {openUnApproved && (
            <View style={{ height: 280 }}>
              {unApprovedRequests.length > 1 && <Text style={{ marginLeft: 15, marginTop: 15, color: "#787878" }}>
                Slide to see more
              </Text>}
              <FlatList
                data={unApprovedRequests}
                horizontal
                renderItem={({ item }) => (
                  <Request
                    request={item}
                    key={item.order_id}
                    navigation={navigation}
                  />
                )}
              />
            </View>
          )}
          {/* Confirmed  Request */}
          <Pressable style={styles.requestWrapper} onPress={isConfirmed}>
            <Text style={styles.requestHeader}>Confirmed Order</Text>
            <View
              style={{
                backgroundColor: "#319df7",
                height: 20,
                width: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
                {confirmedRequests.length}
              </Text>
            </View>
          </Pressable>

          {openConfirmed && (
            <View style={{ height: 280 }}>
              {confirmedRequests.length > 1 && <Text style={{ marginLeft: 15, marginTop: 15, color: "#787878" }}>
                Slide to see more
              </Text>}
              <FlatList
                data={confirmedRequests}
                horizontal
                renderItem={({ item }) => (
                  <Request
                    request={item}
                    key={item.order_id}
                    navigation={navigation}
                  />
                )}
              />
            </View>
          )}

          {/* Terminated  Request */}
          <Pressable style={styles.requestWrapper} onPress={isTerminated}>
            <Text style={styles.requestHeader}>Terminated Order</Text>
            <View
              style={{
                backgroundColor: "#319df7",
                height: 20,
                width: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
                {terminatedRequests.length}
              </Text>
            </View>
          </Pressable>

          {openTerminated && (
            <View style={{ height: 280 }}>
              {terminatedRequests.length > 1 && <Text style={{ marginLeft: 15, marginTop: 15, color: "#787878" }}>
                Slide to see more
              </Text>}
              <FlatList
                data={terminatedRequests}
                horizontal
                renderItem={({ item }) => (
                  <Request
                    request={item}
                    key={item.order_id}
                    navigation={navigation}
                  />
                )}
              />
            </View>
          )}

          <View style={{ height: 50 }} />
        </ScrollView>

      }

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 15,
  },
  requestWrapper: {
    height: 60,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 1,
    marginVertical: 2,
    alignItems: "center",
  },
  requestHeader: {
    color: "#000",


    fontSize: 18,
  },
});
export default ManageRequestScreen;
