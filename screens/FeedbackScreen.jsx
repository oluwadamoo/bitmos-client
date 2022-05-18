import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import axios from "axios";

const happy = require("../assets/images/icons/happy.png");
const eye_rolling = require("../assets/images/icons/eye-rolling.png");
const sad = require("../assets/images/icons/sad.png");
const indifferent = require("../assets/images/icons/indifferent.png");
// const happy = require("../assets/images/icons/happy")
// const happy = require("../assets/images/icons/happy")


const emoji = [
  {
    id: 1,
    icon: eye_rolling,
  },
  {
    id: 2,
    icon: sad,
  },
  {
    id: 3,
    icon: indifferent,
  },
  {
    id: 4,
    icon: happy,
  },
];

const no = [
  {
    id: 1,
    name: 1,
  },
  {
    id: 2,
    name: 2,
  },
  {
    id: 3,
    name: 3,
  },
  {
    id: 4,
    name: 4,
  },
  {
    id: 5,
    name: 5,
  },
  {
    id: 6,
    name: 6,
  },
  {
    id: 7,
    name: 7,
  },
  {
    id: 8,
    name: 8,
  },
  {
    id: 9,
    name: 9,
  },
  {
    id: 10,
    name: 10,
  },
];

const color = "#00709e";
const size = 28;
const FeedbackScreen = ({ navigation }) => {

  const [isRecommended, setIsRecommended] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState()
  const [currentSatisfactionIndex, setCurrentSatisfactionIndex] = React.useState()
  const [rating, setRating] = React.useState(0)
  const [isSatisfied, setIsSatisfied] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [suggestion, setSuggestion] = React.useState("")

  const [stars, setStars] = React.useState([
    { 0: 1 },
    { 1: 0 },
    { 2: 0 },
    { 3: 0 },
    { 4: 0 },
  ])

  const isPressed = (i) => {
    setRating(i + 1)
    let star = [{ 0: 0 },
    { 1: 0 },
    { 2: 0 },
    { 3: 0 },
    { 4: 0 },
    ]
    for (var index = i; index >= 0; index--) {

      star[index][index] = 1
      // console.log(index)


    }
    setStars(star)



  }

  const setRecommendation = (i) => {
    setCurrentIndex(i)
    setIsRecommended(true)
  }
  const setSatisfaction = (i) => {
    setCurrentSatisfactionIndex(i)
    setIsSatisfied(true)
  }

  const user = useSelector((state) => state.user);
  const token = user?.userData.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: "802",
  };

  let body = {
    performance: emoji[currentSatisfactionIndex]?.id,
    rating: rating,
    recommendation_scale: no[currentIndex]?.name,
    suggestion: suggestion
  }

  const sendFeedBack = async () => {
    setLoading(true)
    try {
      const res = await axios.post(
        `https://backend.bitmoservice.com/api/resources/v1/client/send-feedback`, body,
        { headers }
      );
      console.log(res.data)
      setLoading(false)

      if (res.data.code == 200) {
        alert("Feedback submitted successfully! \n\n Thanks!")
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

      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.rowText}>
            Overall, how satisfied or dissatisfied are you with our app?{" "}
          </Text>
          <View style={styles.rowIconsContainer}>
            {emoji.map((e, i) => (
              <Pressable
                onPress={() => setSatisfaction(i)}
                key={i}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
              >
                <View style={{ backgroundColor: isSatisfied && currentSatisfactionIndex == i ? color : "transparent" }}>
                  <Image source={e.icon} style={styles.icon} />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>
            How would you rate our customer service system?
          </Text>
          <View style={styles.rowIconsContainer}>
            {/* {stars.map((s, i) => ( */}
            {stars.map((star, i) => (
              <Pressable onPress={() => isPressed(i)} key={i}>
                <Text> <AntDesign name="star" size={24} color={stars[i][i] == 0 ? "#979797" : "#00709e"} /></Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>
            On a scale of 10, How likely are you to recommend our app to a
            friend or colleagues?
          </Text>
          <View
            style={[styles.rowIconsContainer, { justifyContent: "center" }]}
          >
            {no.map((n, i) => (
              <Pressable
                key={i}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={() => setRecommendation(i)}
              >
                <View
                  style={{
                    padding: 5,
                    height: 26,
                    minWidth: 26,
                    borderWidth: 0.5,
                    borderColor: "#979696",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isRecommended && currentIndex == i ? color : "#fff",
                    borderTopLeftRadius: i == 0 ? 3 : 0,
                    borderBottomLeftRadius: i == 0 ? 3 : 0,
                    borderTopRightRadius: i == 9 ? 3 : 0,
                    borderBottomRightRadius: i == 9 ? 3 : 0,
                    borderRadius: 0.1,
                  }}
                >
                  <Text
                    style={{
                      color: isRecommended && currentIndex == i ? "#fff" : color,
                      fontWeight: "600",
                    }}
                  >
                    {n.name}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>
            Do you have any suggestions, complaints, recommendations, and/or
            questions?
          </Text>
          <View style={styles.rowInputContainer}>
            <TextInput
              value={suggestion}
              onChangeText={setSuggestion}
              style={styles.input}
              placeholder="Type here..."
              multiline
            />

            <Pressable
              onPress={sendFeedBack}
              style={({ pressed }) => [
                {
                  backgroundColor: color,
                  height: 40,
                  minWidth: 80,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
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
        </View>
      </ScrollView>
    </>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff"
  },
  row: {
    marginVertical: 10,
  },
  rowText: {
    fontWeight: "600",
    fontSize: 16,
  },
  rowIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginVertical: 6,
  },
  icon: {
    width: 40,
    height: 40,
  },
  rowInputContainer: {},
  input: {
    width: "100%",
    minHeight: 50,
    borderWidth: 0.5,
    borderColor: "#d1d1d1",
    borderRadius: 5,
    marginVertical: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
});
