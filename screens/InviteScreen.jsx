import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";

const InviteScreen = ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)


  const user = useSelector((state) => state.user);
  const token = user?.userData.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: 801,
  };

  let body = {
    email: email,
    name: name
  }

  const inviteFriend = async () => {

    setLoading(true)
    try {
      const res = await axios.post(
        `https://backend.bitmoservice.com/api/resources/v1/client/invite-friend`, body,
        { headers }
      );
      console.log(res.data)
      setLoading(false)

      if (res.data.code == 200) {
        alert("Invite Sent successfully! \n\n Thanks!")
        setSuggestion("")
      } else {
        alert("An Error Occurred!")
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
    }


  }
  return (
    <>
      <Header navigation={navigation} home={true} />
      <View style={{ flex: 1, padding: 15 }}>
        <TextInput
          value={
            "Hey there!, I use Bytmoservice to request for my day-to-day services, Join now!"
          }
          multiline
          style={{
            width: "100%",
            minHeight: 60,
            borderWidth: 1,
            borderColor: "#d1d1d1",
            borderRadius: 5,
            // marginVertical: 15,
            padding: 5,
            paddingHorizontal: 10,
            fontWeight: "500",
          }}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Friend's email Address"
          keyboardType="email-address"
          style={{
            width: "100%",

            marginVertical: 15,
            minHeight: 30,
            borderWidth: 1,
            borderColor: "#d1d1d1",
            borderRadius: 5,
            padding: 5,
            paddingHorizontal: 10,
            alignItems: "center"
          }}
        />

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Friend's name"

          style={{
            alignItems: "center",
            width: "100%",
            minHeight: 30,
            borderWidth: 1,
            borderColor: "#d1d1d1",
            borderRadius: 5,
            padding: 5,
            paddingHorizontal: 10,
          }}
        />

        <Pressable
          onPress={inviteFriend}
          style={({ pressed }) => [
            {
              marginTop: 20,
              backgroundColor: "#00709e",
              height: 40,
              minWidth: 80,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginBottom: 50,
            },
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          {
            loading ? <ActivityIndicator color={"#fff"} /> : <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#fff",
              }}
            >
              Submit
            </Text>
          }
        </Pressable>
      </View>
    </>
  );
};

export default InviteScreen;
