import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-web";
import { UIActivityIndicator } from "react-native-indicators";

const OrderHistory = ({ navigation, route }) => {
  const request = route.params.request;

  const [pendingDetails, setPendingDetails] = useState([]);
  const [approvedDetails, setApprovedDetails] = useState([]);
  const [completedDetails, setCompletedDetails] = useState([]);
  const [unApprovedDetails, setUnApprovedDetails] = useState([]);
  const [terminatedDetails, setTerminatedDetails] = useState([]);

  const [pageLoading, setPageLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openTerminateDialog, setOpenTerminateDialog] = useState(false);
  let details =
    request.status.toLowerCase() == "pending"
      ? pendingDetails
      : request.status.toLowerCase() == "approved"
        ? approvedDetails
        : request.status.toLowerCase() == "unapproved"
          ? unApprovedDetails
          : request.status.toLowerCase() == "completed"
            ? completedDetails
            : request.status.toLowerCase() == "terminated"
              ? terminatedDetails
              : null;

  let initOrderDate = `${details?.date} ${details?.appointment_time}`;
  // console.log(new Date(initOrderDate).toString());
  let initDate = new Date(details?.date);
  const [date, setDate] = useState(new Date(details?.date));
  const [time, setTime] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  console.log(details);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setTime(time);
    hideTimePicker();
  };

  const user = useSelector((state) => state.user);

  const token = user?.userData.token;
  let service_order_id = request.order_id;
  const headers = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: "718",
  };


  useEffect(() => {
    const fetchPendingDetails = async () => {
      setPageLoading(true)
      const res = await axios.get(
        `https://backend.bitmoservice.com/api/resources/v1/client/pending-order/${service_order_id}`,
        { headers }
      );

      setPendingDetails(res.data.data);
      setPageLoading(false)
    };
    const fetchApprovedDetails = async () => {
      setPageLoading(true)

      const res = await axios.get(
        `https://backend.bitmoservice.com/api/resources/v1/client/approved-order/${service_order_id}`,
        { headers: { ...headers, Resource_Code: 720 } }
      );
      setApprovedDetails(res.data.data);
      setPageLoading(false)

      //   console.log(res.data, "approved");
      //   console.log("==================================");
    };
    const fetchCompletedDetails = async () => {
      setPageLoading(true)

      const res = await axios.get(
        `https://backend.bitmoservice.com/api/resources/v1/client/completed-order/${service_order_id}`,
        { headers: { ...headers, Resource_Code: 723 } }
      );
      setCompletedDetails(res.data.data);
      setPageLoading(false)

      console.log(res.data, "completed");
      //   console.log("==================================");
    };
    const fetchUnapprovedDetails = async () => {
      setPageLoading(true)

      const res = await axios.get(
        `https://backend.bitmoservice.com/api/resources/v1/client/unapproved-order/${service_order_id}`,
        { headers: { ...headers, Resource_Code: 724 } }
      );
      if (res.data.data) {
        setUnApprovedDetails(res.data.data);
        setPageLoading(false)

      }
      //   console.log(res.data, "unapproved");
      //   console.log("==================================");
    };
    const fetchTerminatedDetails = async () => {
      setPageLoading(true)

      const res = await axios.get(
        `https://backend.bitmoservice.com/api/resources/v1/client/terminated-order/${service_order_id}`,
        { headers: { ...headers, Resource_Code: 721 } }
      );
      if (res.data.data) {
        setTerminatedDetails(res.data.data);
        setPageLoading(false)

      }
      //   console.log(res.data, "unapproved");
      //   console.log("==================================");
    };
    fetchPendingDetails();
    fetchUnapprovedDetails();
    fetchCompletedDetails();
    fetchApprovedDetails();
    fetchTerminatedDetails();
  }, []);
  // console.log(details, "REQUEST");


  const terminateOrder = async () => {
    if (request.status.toLowerCase() == "pending") {
      setIsLoading(true)
      try {
        let res = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/cancel-service-request", { service_request_id: details.order_id },
          { headers: { ...headers, Resource_Code: 732 } }
        )

        // console.log(res.data, "CANCELLED");
        if (res.data.code == 200) {
          alert(res.data.message)
          setOpenTerminateDialog(false)
        } else {
          alert("something went wrong")
          setOpenTerminateDialog(false)
        }
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        console.log(e);
      }
    }
    else {
      setIsLoading(true)
      try {
        let res = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/terminate-service-order", { service_order_id: details.order_id },
          { headers: { ...headers, Resource_Code: 726 } }
        )

        // console.log(res.data, "TERMINATED");
        if (res.data.code == 200) {
          alert(res.data.message)
          setOpenTerminateDialog(false)
        } else {
          alert("something went wrong")
          setOpenTerminateDialog(false)
        }
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        console.log(e);
      }
    }

  }
  //   console.log(details, "d for details");
  //   console.log(date);
  //   console.log(date.toString());

  const [location, setLocation] = useState();
  return (
    <>
      <Header navigation={navigation} title={`${request.status} Order`} />
      {pageLoading ?
        <View style={{ marginTop: Dimensions.get("screen").height / 2.5 }}>
          <UIActivityIndicator color={"#00709e"} />

        </View> :
        <View style={styles.container}>
          <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
            <View style={styles.top}>
              <View style={styles.topItems}>
                <Text style={styles.topTitle}>Service:</Text>
                <Text style={styles.topDetails}>{details?.service}</Text>
              </View>
              <View style={styles.topItems}>
                <Text style={styles.topTitle}>Category:</Text>
                <Text style={styles.topDetails}>{details?.main_category}</Text>
              </View>
              <View style={styles.topItems}>
                <Text style={styles.topTitle}>Service Provider:</Text>
                <Text style={styles.topDetails}>{details?.service_provider}</Text>
              </View>
              <View style={styles.topItems}>
                <Text style={styles.topTitle}>Service Type:</Text>
                <Text style={styles.topDetails}>Home</Text>
              </View>
            </View>

            {
              request.status == "Approved" || request.status == "Terminated" || request.status == "Completed" ? <View style={{ marginVertical: 20 }}>
                <Text >Appointment Time</Text>

                <View style={{ justifyContent: 'space-between', flexDirection: "row", marginTop: 10 }}>
                  <Text style={{
                    fontSize: 15,
                    marginBottom: 5,
                    color: "rgb(78, 78, 78)",
                    fontWeight: "700",
                  }}>Tue, Feb 2</Text>
                  <Text style={{
                    fontSize: 15,
                    marginBottom: 5,
                    color: "rgb(78, 78, 78)",
                    fontWeight: "700",
                  }}>5:30 PM - 6:30 PM</Text>
                </View>
              </View> : <View style={styles.durationContainer}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 5,
                      color: "rgb(78, 78, 78)",
                      fontWeight: "700",
                      fontWeight: "600",
                    }}
                  >
                    Date
                  </Text>
                  <Pressable
                    onPress={showDatePicker}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                      styles.duration,
                    ]}
                  >
                    <Text style={{ color: "#808080", fontFamily: "monospace" }}>
                      {details?.date}
                    </Text>
                    <AntDesign name="calendar" size={10} color="black" />
                  </Pressable>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 5,
                      color: "rgb(78, 78, 78)",
                      fontWeight: "700",
                      fontWeight: "600",
                    }}
                  >
                    Time
                  </Text>
                  <Pressable
                    onPress={showTimePicker}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                      styles.duration,
                    ]}
                  >
                    <Text style={{ color: "#808080", fontFamily: "monospace" }}>
                      {time.getHours() <= 9
                        ? `0${time.getHours().toString()}-${date
                          .getMinutes()
                          .toString()}-${time.getSeconds().toString()} `
                        : `${time.getHours().toString()}-${time
                          .getMinutes()
                          .toString()}-${time.getSeconds().toString()} `}
                    </Text>
                    <AntDesign name="clockcircleo" size={10} color="#808080" />
                  </Pressable>

                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                  />
                </View>
              </View>

            }

            {
              request.status == "Approved" ?
                <View>
                  <Text>Service Location</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      borderColor: "#636262",
                      alignItems: "center",

                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#00709e",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 10,
                      }}
                    >
                      <Ionicons name="location-sharp" size={16} color="#fff" />
                    </View>
                    <Text>{details?.location ? details?.location : "Location not available"}</Text>
                  </View>

                </View> :
                request?.status == "Terminated" || request?.status == "Completed" ?
                  <View>
                    <Text>Service Location</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        borderColor: "#636262",
                        alignItems: "center",

                        marginVertical: 10,
                      }}
                    >
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          backgroundColor: "#00709e",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 10,
                        }}
                      >
                        <Ionicons name="location-sharp" size={16} color="#fff" />
                      </View>
                      <Text>{details?.location ? details?.location : "Not available"}</Text>
                    </View>

                  </View>


                  : <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "#636262",
                      borderRadius: 10,
                      alignItems: "center",

                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#00709e",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 5,
                      }}
                    >
                      <Ionicons name="location-sharp" size={16} color="#fff" />
                    </View>
                    <TextInput
                      onChangeText={setLocation}
                      value={location}
                      style={{
                        paddingHorizontal: 10,
                        height: 33,
                        width: Dimensions.get("screen").width - 60,
                        fontWeight: "500",
                      }}
                      placeholder="Add your location"
                    />
                  </View>

            }

            {/* Service breakdown */}

            <View style={styles.breakdownContainer}>
              <View style={styles.breakdown}>
                <Text style={styles.breakdownTitle}>Service Fee:</Text>
                <Text style={styles.breakdownDetails}>NGN {3000}</Text>
              </View>
              <View style={styles.breakdown}>
                <Text style={styles.breakdownTitle}>VAT:</Text>
                <Text style={styles.breakdownDetails}>
                  NGN {(parseInt(3000) * 7.5) / 100}
                </Text>
              </View>
              <View style={styles.breakdown}>
                <Text
                  style={[
                    styles.breakdownTitle,
                    { fontWeight: "bold", color: "#00709e" },
                  ]}
                >
                  Total:
                </Text>
                <Text style={[styles.breakdownDetails, { color: "#00709e" }]}>
                  NGN {(parseInt(3000) * 7.5) / 100 + parseInt(3000)}
                </Text>
              </View>

              <View style={styles.breakdown}>
                <Text style={styles.breakdownTitle}>Payment Status:</Text>
                <Text style={styles.breakdownDetails}>{details?.payment_status}</Text>
              </View>

              <View style={styles.breakdown}>
                <Text style={styles.breakdownTitle}>{request.status == "Approved" || request.status == "Completed" ? "Servitor" : request.status != "Terminated" && "Payment Method:"}</Text>
                <Text style={styles.breakdownDetails}>{request.status == "Approved" || request.status == "Completed" ? details?.service_provider : request.status != "Terminated" && "Wallet"}</Text>
              </View>
              <View style={styles.breakdown}>
                <Text style={styles.breakdownTitle}>{request.status == "Completed" && "Service Status"}</Text>
                <Text style={styles.breakdownDetails}>{request.status == "Completed" && details?.order_status}</Text>
              </View>
            </View>

            {request.status == "Approved" ?
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      alignSelf: "center",
                      height: 47,
                      width: 47,
                      backgroundColor: "#00709e",

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 40,
                    },
                  ]}
                >
                  <Ionicons name="call" size={34} color="#fff" />
                </Pressable>

                <Pressable
                  onPress={() => navigation.push("Messages")}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      alignSelf: "center",
                      height: 50,
                      width: 50,
                      backgroundColor: "transparent",

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                  ]}
                >
                  <Ionicons name="chatbubble-ellipses" size={47} color="#00709e" />

                </Pressable>
              </View> :
              request.status != "Terminated" && request.status != "Completed" &&
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >

                <Pressable
                  onPress={() => setOpenTerminateDialog(true)}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      alignSelf: "center",
                      height: 40,
                      width: (Dimensions.get("screen").width - 30) / 2.3,
                      backgroundColor: "#8b8b8b",

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      // fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </Text>
                </Pressable>

                {
                  details.payment_status != "Paid" ?
                    <Pressable
                      style={({ pressed }) => [
                        {
                          opacity: pressed ? 0.5 : 1,
                          alignSelf: "center",
                          height: 40,
                          width: (Dimensions.get("screen").width - 30) / 2,
                          backgroundColor: "#00709e",

                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          // fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Proceed for Payment
                      </Text>
                    </Pressable> :
                    <Pressable
                      onPress={() => navigation.push("Messages")}
                      style={({ pressed }) => [
                        {
                          opacity: pressed ? 0.5 : 1,
                          alignSelf: "center",
                          height: 40,
                          width: (Dimensions.get("screen").width - 30) / 2,
                          backgroundColor: "#00709e",

                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          // fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Chat With Provider
                      </Text>
                    </Pressable>

                }
              </View>

            }

            {
              request.status == "Approved" &&
              <View style={{ marginVertical: 20 }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      alignSelf: "flex-start",
                      height: 40,
                      width: 140,
                      backgroundColor: "#fcfbfb",
                      elevation: .5,

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                  ]}

                  onPress={() => navigation.navigate("Dispute", { details })}
                >
                  <Text>Open a dispute</Text>
                </Pressable>

                {request.status == "Approved" ?
                  <Pressable
                    style={({ pressed }) => [
                      {
                        marginVertical: 5,
                        opacity: pressed ? 0.5 : 1,
                        alignSelf: "flex-start",
                        height: 40,
                        width: 140,
                        backgroundColor: "#fcfbfb",
                        elevation: .5,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                      },
                    ]}
                    onPress={() => setOpenTerminateDialog(true)}
                  >
                    <Text style={{ color: "red" }}>Terminate Order</Text>
                  </Pressable> : request.status != "Completed" && <View
                    style={{
                      marginVertical: 5,
                      alignSelf: "flex-start",
                      height: 40,
                      width: 140,
                      backgroundColor: "#fff",

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}

                  ><Text style={{ color: "red" }}>Order Terminated</Text></View>
                }
              </View>
            }
            {
              request.status == "Terminated" &&
              <View style={{ marginVertical: 20 }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      alignSelf: "flex-start",
                      height: 40,
                      width: 140,
                      backgroundColor: "#fcfbfb",
                      elevation: .5,

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                  ]}
                  onPress={() => navigation.navigate("Dispute", { details })}


                >
                  <Text>Open a dispute</Text>
                </Pressable>

                {request.status == "Approved" ?
                  <Pressable
                    style={({ pressed }) => [
                      {
                        marginVertical: 5,
                        opacity: pressed ? 0.5 : 1,
                        alignSelf: "flex-start",
                        height: 40,
                        width: 140,
                        backgroundColor: "#fcfbfb",
                        elevation: .5,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                      },
                    ]}
                    onPress={() => setOpenTerminateDialog(true)}
                  >
                    <Text style={{ color: "red" }}>Terminate Order</Text>
                  </Pressable> : <View
                    style={{
                      marginVertical: 5,
                      alignSelf: "flex-start",
                      height: 40,
                      width: 140,
                      backgroundColor: "#fff",

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}

                  ><Text style={{ color: "red" }}>Order Terminated</Text></View>
                }
              </View>
            }
            {
              request.status == "Completed" &&
              <View style={{ marginVertical: 20 }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      alignSelf: "flex-start",
                      height: 40,
                      width: 140,
                      backgroundColor: "#fcfbfb",
                      elevation: .5,

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                  ]}

                  onPress={() => navigation.navigate("Dispute", { details })}
                >
                  <Text>Open a dispute</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      alignSelf: "flex-start",
                      height: 40,
                      width: 140,
                      backgroundColor: "#fcfbfb",
                      elevation: .5,
                      marginTop: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                  ]}

                  onPress={() => navigation.navigate("Review", { details: details })}
                >
                  <Text>Review Servitor</Text>
                </Pressable>


              </View>
            }
          </ScrollView>

          {openTerminateDialog &&
            <View style={{ padding: 20, position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.308)", top: 0, left: 0, width: Dimensions.get("screen").width, height: Dimensions.get("screen").height }}>
              <View style={{ backgroundColor: "#fff", padding: 10, marginTop: Dimensions.get("screen").height * 0.3, borderRadius: 10 }}>
                <Pressable style={({ pressed }) => [
                  {
                    marginVertical: 5,
                    opacity: pressed ? 0.5 : 1,
                    alignSelf: "flex-end",
                    height: 20,
                    width: 20,
                    backgroundColor: "#fcfbfb",
                    elevation: .5,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  },
                ]}
                  onPress={() => setOpenTerminateDialog(false)}
                ><Text style={{ fontWeight: "900", fontSize: 15 }}>x</Text></Pressable>
                <Text>
                  {request.status.toLowerCase() == "pending" ? "Are you sure you want to cancel this order?" : "On terminating this order, the amount been charged will be returned to your wallet and can be used to order another service or the same service from a different service provider. \n Do you still want to continue this process? "}
                </Text>

                <View style={{ height: 50 }} />

                {isLoading ? <View style={{ alignItems: "center", justifyContent: "center" }}> <ActivityIndicator /></View> : <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Pressable style={({ pressed }) => [
                    {
                      marginVertical: 5,
                      opacity: pressed ? 0.5 : 1,

                      height: 40,
                      width: 130,
                      backgroundColor: "grey",

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                  ]}
                    onPress={() => setOpenTerminateDialog(false)}
                  ><Text style={{ color: "#fff" }}>No</Text></Pressable>
                  <Pressable style={({ pressed }) => [
                    {
                      marginVertical: 5,
                      opacity: pressed ? 0.5 : 1,

                      height: 40,
                      width: 130,
                      backgroundColor: "#319df7",

                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                  ]}
                    onPress={terminateOrder}
                  ><Text style={{ color: "#fff" }}>Yes</Text></Pressable>
                </View>}

              </View>
            </View>

          }

        </View>
      }
    </>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  wrapper: {},
  top: {},
  topItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  topTitle: {
    width: Dimensions.get("screen").width / 2.5,
    marginRight: Dimensions.get("screen").width / 4.5,
    fontSize: 15,
  },
  topDetails: {
    alignSelf: "flex-end",
    width: Dimensions.get("screen").width / 2.5,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  duration: {
    width: Dimensions.get("screen").width / 2.4,
    borderWidth: 1,
    borderColor: "#636262",
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.274)",
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  breakdownContainer: {
    marginVertical: 10,
  },
  breakdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
    marginBottom: 10,
  },
  breakdownTitle: {
    fontSize: 15,
    width: Dimensions.get("screen").width / 2,
    marginRight: Dimensions.get("screen").width / 4.5,
  },
  breakdownDetails: {
    fontWeight: "bold",
    fontSize: 15,
    width: Dimensions.get("screen").width / 2.5,
  },
});
