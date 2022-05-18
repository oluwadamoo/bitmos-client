import React, { useState, useEffect } from "react";
import { Platform, View, Text, Dimensions, StyleSheet, Pressable, ActivityIndicator, TextInput } from 'react-native';
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios'
import { ScrollView } from "react-native-gesture-handler";

import { Ionicons } from '@expo/vector-icons';
import ShowMap from "../components/ShowMap";
const SellScreen = ({ navigation }) => {
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [serviceDesc, setServiceDesc] = useState("")
  const [service, setService] = useState("home")
  const [isLoading, setIsLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState()
  const [region, setRegion] = React.useState({
    latitude: 6.601838,
    longitude: 3.351486,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState(false);
  const [duration, setDuration] = useState(2)
  const mainCategory = useSelector((state) => state.mainCategory)?.mainCategory;
  const user = useSelector((state) => state.user);

  const token = user?.userData.token;

  const [subCategories, setSubCategories] = React.useState([]);

  // console.log(token)

  const header = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: 602,
  };
  useEffect(() => {

    if (!mainCategory) {
      alert("Please check out the available categories \n \n from the category tab")
    }

    // console.log(category)
    // if (!category) {
    //   alert("Please choose a category")
    // }
    const fetchSubCategories = async () => {
      try {
        // setIsLoading(true);
        const res = await axios.get(
          `https://backend.bitmoservice.com/api/resources/v1/client/sub-categories/${category}`,
          { headers: header }
        );


        setSubCategories(res.data?.data.sub_category_details);
        // console.log("data from sub category  ", res.data.data.sub_category_details);

        // setIsLoading(false);
      } catch (e) {
        console.warn(e);
        // setIsLoading(false);
      }
    };
    fetchSubCategories();

  }, [category]);

  // console.log(subCategory)
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



  const headers = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: "731",
  };

  let body = {
    service_type: service,
    main_category_id: category,
    sub_category_id: subCategory,
    appointment_date: `${date.toISOString().split('T')[0]} ${date.toISOString().split('T')[1].split(".")[0]}`,
    duration: duration,
    description: serviceDesc,
    service_address: location,
    service_address_longitude: region.longitude,
    service_address_latitude: region.latitude
  }


  const postService = async () => {
    if (!isLoading && service.length > 0 && serviceDesc.length > 0 && category.length > 0 && subCategory.length > 0) {
      if (service == "home" && location == undefined) {
        alert("The address field is required")
      } else {
        setIsLoading(true)
        try {
          let res = await axios.post(
            "https://backend.bitmoservice.com/api/resources/v1/client/post-service-request",
            body, { headers: headers }
          )
          console.log(res.data)
          if (res.data.code == 200) {
            alert("Your service request has been posted successful!")

            setService("")
            setCategory("")
            setSubCategory("")
            setServiceDesc("")
            setLocation("")
          } else {
            alert("An Error Occurred!")

          }
          setIsLoading(false)
        } catch (e) {

          alert("An Error Occurred!")
          setIsLoading(false)

          console.log(e)
        }
      }
    } else {
      alert("We are processing your request")
    }

  }
  return (
    <>
      <Header navigation={navigation} title={"   Post a service request"} />
      {!showMap && <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View>
            <View
              style={styles.cat_picker}
            >
              <Picker
                selectedValue={category}
                onValueChange={(value, index) => setCategory(value)}
              //   onValueChange={(itemValue, itemIndex) => editGender(itemValue)}
              //   onTouchEnd={() => editProfile("gender")}
              >
                <Picker.Item
                  label={category ? category : "Choose Category"}
                  value={category && category}
                  enabled={false}
                />
                {mainCategory && mainCategory.map((cat, i) => (
                  <Picker.Item label={cat.name} value={cat.main_category_id} key={i} />
                ))}
              </Picker>
            </View>
            <View
              style={styles.cat_picker}
            >
              <Picker
                selectedValue={subCategory}
                onValueChange={(itemValue, itemIndex) => setSubCategory(itemValue)}
              //   onTouchEnd={() => editProfile("gender")}
              >
                <Picker.Item
                  label={subCategory ? subCategory : "Choose Sub-category"}
                  value={subCategory && subCategory}
                  enabled={false}
                />
                {subCategories && subCategories.map((sc, i) => (
                  <Picker.Item label={sc.name} value={sc.sub_category_id} key={i} />

                ))}</Picker>
            </View>


            <View>
              <Text>Briefly describe the nature of the service</Text>
              <View style={styles.dispute}>

                <TextInput multiline={true}
                  onChangeText={setServiceDesc}
                  maxLength={200}

                  value={serviceDesc}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,

                  }}

                />
                <Text style={{ alignSelf: "flex-end" }}>{serviceDesc.length}/200</Text>
              </View>
            </View>

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
                selectedValue={service}

                onValueChange={(itemValue, itemIndex) => setService(itemValue)}
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
            <Pressable
              onPress={() => setShowMap(true)}
              style={[styles.cat_picker, { paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }]}
            >
              <Ionicons name="location-sharp" size={20} color="#00709e" />

              <Text style={{ marginLeft: 10 }}>{location ? location : "Enter Your Location"}</Text>
            </Pressable>
          </View>

        </ScrollView>



        <Pressable onPress={postService} style={({ pressed }) => [{
          opacity: pressed ? .5 : 1, height: 40, backgroundColor: "#00709e",
          width: Dimensions.get("screen").width - 20, justifyContent: "center", alignItems: "center", borderRadius: 15
        }]}>
          {isLoading ? <ActivityIndicator color={"#fff"} /> : <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>Submit</Text>
          }
        </Pressable>
      </View>}
      {showMap &&

        <ShowMap region={region} setRegion={setRegion} setShowMap={setShowMap} setLocation={setLocation} />
      }


    </>
  );
};



export default SellScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  dispute: {
    padding: 10,
    height: 200,
    maxHeight: 300,
    borderColor: '#c7c7c9',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "space-between"
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
  map: {
    // flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  }

})