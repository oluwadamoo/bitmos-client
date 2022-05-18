import { View, Text, Dimensions, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";

export default function DisputeScreen({ navigation, route }) {
  const details = route.params.details
  const [complaint, setComplaint] = useState("")
  const [complaintDesc, setComplaintDesc] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // console.log(details)
  const user = useSelector((state) => state.user);

  const token = user?.userData.token;

  const headers = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: "728",
  };
  const makeDispute = async () => {
    if (isLoading == false) {
      setIsLoading(true)
      try {
        let res = await axios.post(
          "https://backend.bitmoservice.com/api/resources/v1/client/create-dispute", { bs_partner_id: details.service_provider_id, service_order_id: details.order_id, subject: complaint, description: complaintDesc },
          { headers: { headers } }
        )
        // console.log(res)
        if (res.data.code == 200) {
          alert("Dispute raised successfully")
          setComplaint("")
          setComplaintDesc("")
          setIsLoading(false)
        } else {

          alert("Eror Occured")
          setIsLoading(false)

        }
      } catch (e) {
        console.log(e);
        setIsLoading(false)

        alert("An Error Occurred, Try again")
      }
    }

  }

  return (
    <>
      <Header navigation={navigation} title={"Dispute"} />
      <View style={styles.container}>
        <View>
          <View
            style={{
              marginVertical: 10,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "#6b6969",
              backgroundColor: "#fff",
              height: 50,
              width: Dimensions.get("screen").width - 20,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Picker
              selectedValue={complaint}
            //   onValueChange={(itemValue, itemIndex) => editGender(itemValue)}
            //   onTouchEnd={() => editProfile("gender")}
            >
              <Picker.Item
                label={complaint ? complaint : "Choose Complain"}
                value={complaint && complaint}
                enabled={false}
              />
              <Picker.Item label="I cannot complete my order" value="cannot complete my order" />
              <Picker.Item label="The service provider is not responding" value="service provider is not responding" />
              <Picker.Item label="I couldn't contact the service provider" value="i couldn't contact the service provider" />
              <Picker.Item label="Others" value="others" />
            </Picker>
          </View>


          <View>
            <Text>Briefly describe the nature of your complaint</Text>
            <View style={styles.dispute}>

              <TextInput multiline={true}
                onChangeText={setComplaintDesc}
                maxLength={200}
                value={complaintDesc}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  height: 150,

                }}

              />
              <Text style={{ alignSelf: "flex-end" }}>{complaintDesc.length}/200</Text>
            </View>
          </View>
        </View>
        <Pressable onPress={makeDispute} style={({ pressed }) => [{
          opacity: pressed ? .5 : 1, height: 40, backgroundColor: "#00709e",
          width: Dimensions.get("screen").width - 20, justifyContent: "center", alignItems: "center", borderRadius: 15
        }]}>
          {isLoading ? <ActivityIndicator color={"#fff"} /> : <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>Submit</Text>
          }
        </Pressable>
      </View>

    </>
  );
}

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
  }
})