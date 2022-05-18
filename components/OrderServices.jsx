import React, { useState } from "react";

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import ServiceProviders from "./ServiceProviders";
import { Picker } from "@react-native-picker/picker";
import ShowMap from "./ShowMap";
import ServiceListing from "../screens/ServiceListing";

const OrderServices = ({ setRegion, provider, navigation, service, setLoading, relatedProviders, id, setShowMap, region, location }) => {
  //  console.log(data, "Data.........");
  const user = useSelector((state) => state.user);
  const [showDate, setShowDate] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  // const [showMap, setShowMap] = useState(false)
  const [openPartnerLoc, setOpenPartnerLoc] = useState(false)
  const [duration, setDuration] = useState(2)
  const [serviceLoc, setServiceLoc] = useState("home")
  // const [location, setLocation] = useState()
  // const [region, setRegion] = React.useState({
  //   latitude: 6.601838,
  //   longitude: 3.351486,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421
  // })
  let orderDate =
    date &&
    `${date.toISOString().split('T')[0]} ${date.toISOString().split('T')[1].split(".")[0]}`;

  // console.log(orderDate);
  // console.log("20-11-21 10:12:34");

  const placeOrder = async () => {
    if (serviceLoc == "home" && !location) {
      alert("Please enter your location")
      return
    }
    else {
      setLoading(true);
      const token = user?.userData.token;
      const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 709,
      };

      var data = {
        partner_id: provider.partner_id,
        service_id: service.service_id,
        appointment_date: orderDate,
        duration: 4,
        service_type: serviceLoc,
        price: service.price,
        address: location,
      };

      try {
        const res = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/service/place-order",
          data,
          { headers: header }
        );

        console.log(
          "==========================================================="
        );

        if (res.data.code == 200) {
          navigation.push("Place order", { data: res.data.data });
          setLoading(false);
        }

      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };


  // console.log(
  //   `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${
  //     date.toString().split(" ")[4]
  //   }`
  // );
  // console.log(provider);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    // console.log(currentDate)
  };

  const showMode = (currentMode) => {
    setShowDate(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (
    <View style={styles.container}>
      {openPartnerLoc ?
        <View>
          <ShowMap region={region} setShowMap={setOpenPartnerLoc} isPartner={true} />
        </View>
        :
        <View style={styles.wrapper}>
          <View style={styles.top}>
            <View style={styles.topName}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',

                  color: "#3d3c3c",
                }}
              >
                {provider.partner_name}
              </Text>
              <Text style={{ fontSize: 18 }}>
                <Text style={{ color: "#e4c04d", fontSize: 18 }}>
                  {service?.partner_info?.rating}{" "}
                </Text>{" "}
                ({service?.partner_info?.reviews ? service?.partner_info?.reviews : 0} reviews)
              </Text>
            </View>
            <View style={styles.topAddress}>
              <View style={styles.topAddressLeft}>
                <Ionicons name="location-sharp" size={20} color="#00709e" />
                <Text
                  style={{
                    color: "#00709e",
                    fontWeight: '600',
                    fontSize: 15,
                  }}
                >

                  {provider.address}
                </Text>
              </View>
              <Pressable onPress={() => setOpenPartnerLoc(true)} style={styles.topAddressRight}>
                <Image
                  source={require("../assets/images/map.png")}
                  style={{ width: 40, height: 40 }}
                />
                <Text style={{
                  fontWeight: '600',
                  fontSize: 15
                }}>
                  View map
                </Text>
              </Pressable>
            </View>
          </View>



          <View style={[styles.desc, { paddingRight: 10 }]}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',

                marginBottom: 12,
              }}
            >
              Description
            </Text>
            <Text style={{
              fontWeight: '600',
              fontSize: 16
            }}>
              {provider.partner_business_description}
            </Text>

            <View style={styles.service}>
              <Text style={{ fontSize: 16.5 }}>
                Service:
              </Text>
              <Text
                style={{
                  fontWeight: '600',

                  // width: Dimensions.get("screen").width / 2,
                  fontSize: 18,
                }}
              >
                {service.title}
              </Text>
            </View>
            <View style={styles.service}>
              <Text style={{ fontSize: 16.5 }}>
                Price:
              </Text>
              <Text
                style={{
                  fontWeight: '600',

                  color: "#00709e",
                  // width: Dimensions.get("screen").width / 2,

                  fontSize: 18,
                }}
              >
                NGN {service.price}
              </Text>
            </View>
          </View>

          {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,Appointment................................. */}
          <View style={styles.appointment}>


            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: '700', fontSize: 17 }}>Set Appointment Schedule</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ padding: 3, marginTop: 10 }}>
                  <Text>Date</Text>
                  <Pressable style={[styles.appointmentButton, { alignItems: "center" }]} onPress={showDatepicker}><Text>{date.toDateString()}</Text></Pressable>
                </View>
                <View style={{ padding: 3, marginTop: 10 }}>
                  <Text>Time</Text>
                  <Pressable style={[styles.appointmentButton, { paddingHorizontal: 8 }]} onPress={showTimepicker}><Text>{date.toTimeString().split(" ")[0]}</Text></Pressable>
                </View>
                <View style={{ padding: 3, marginTop: 10 }}>
                  <Text>Duration</Text>
                  <View style={[styles.appointmentButton, { paddingHorizontal: 8 }]}>
                    <TextInput placeholder="duration" value={duration.toString()} onChangeText={setDuration} />
                  </View>
                </View>


              </View>
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>


            <View
              style={styles.cat_picker}
            >
              <Picker
                selectedValue={serviceLoc}

                onValueChange={(itemValue, itemIndex) => setServiceLoc(itemValue)}
              //   onTouchEnd={() => editProfile("gender")}
              >

                <Picker.Item label={
                  "Home Service"
                } value={"home"} />
                <Picker.Item label={
                  "Office"
                } value={"office"} />
                <Picker.Item label={
                  "Freelance"
                } value={"freelance"} />

              </Picker>
            </View>

            <View>
              {/* <Text
              style={{
                fontSize: 20,
                marginBottom: 5,
                color: "rgb(78, 78, 78)",
                fontWeight: "700",
              }}
            >
              Location
            </Text> */}
              {serviceLoc == 'home' && <Pressable
                onPress={() => setShowMap(true)}
                style={[styles.cat_picker, { paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }]}
              >
                <Ionicons name="location-sharp" size={20} color="#00709e" />

                <Text style={{ marginLeft: 10 }}>{location ? location : "Enter Your Location"}</Text>
              </Pressable>
              }
            </View>

            {/* Service breakdown */}

            <Pressable
              onPress={placeOrder}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  alignSelf: "center",
                  height: 40,
                  width: Dimensions.get("screen").width - 20,
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
                  fontWeight: '600',
                }}
              >
                Place Order
              </Text>
            </Pressable>

            <View style={{
              width: Dimensions.get('screen').width, backgroundColor: "#6b6b6b", height: 1, marginLeft: -15, marginVertical: 20
            }} />

            {/* Related partners..... */}
            <Text style={{ fontSize: 17, fontWeight: '600' }}>Related Partners</Text>
            {service?.related_partners?.length < 1 ? (
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  style={{
                    color: "#7e7e7e",
                    fontSize: 17,
                  }}
                >
                  No Data To Display
                </Text>
              </View>
            ) : (
              <FlatList
                data={service?.related_partners}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <ServiceProviders item={item} navigation={navigation} id={id} />
                )}
              />
            )}
            {/* <ServiceProviders item={} navigation={navigation}/> */}
          </View>
        </View>

      }


    </View>
  );
};

export default OrderServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  wrapper: {},
  top: {
    // flexDirection: "row",
  },
  topName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topAddressLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  topAddressRight: {
    alignItems: "center",
  },
  service: {


    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appointment: {
    marginTop: 20,
  },
  appointmentButton: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#cfcdcd",
    borderRadius: 10,
    width: Dimensions.get("screen").width / 3.4,
    height: 35,
    // alignItems: "center",
    justifyContent: "center"
  },
  cat_picker: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#6b6969",
    backgroundColor: "#fff",
    height: 50,
    width: Dimensions.get("screen").width - 20,
    alignSelf: "center",
    justifyContent: "center",
  },

});
