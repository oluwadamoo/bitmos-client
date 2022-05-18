import { View, Text, StyleSheet, Image, Pressable, TextInput, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import axios from "axios";

export default function ReviewScreen({ navigation, route }) {
    const data = route.params.details

    const [rating, setRating] = useState(0)
    const [isFriendliness, setIsFriendliness] = useState(false)
    const [isProfessionalism, setProfessionalism] = useState(false)
    const [isPatience, setIsPatience] = useState(false)
    const [isCommunication, setIsCommunication] = useState(false)
    const [isResponsiveness, setIsResponsiveness] = useState(false)
    const [isEfficiency, setIsEfficiency] = useState(false)
    const [isTimeliness, setIsTimeliness] = useState(false)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)

    const user = useSelector((state) => state.user);
    let bs_partner_id = data.service_provider_id
    const token = user?.userData.token;
    const headers = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: "729",
    };

    const [stars, setStars] = useState([
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

    let body = {
        bs_partner_id: bs_partner_id,
        performance: `${isCommunication == true && "Communication"} 
        ${isEfficiency && "Efficiency"} 
        ${isFriendliness && "Friendliness"} 
        ${isPatience && "Patience"}
         ${isProfessionalism && "Professionalism"}
          ${isResponsiveness && "Responsiveness"}
           ${isTimeliness && "Timeliness"}`,

        rating: rating,
        comment: comment
    }
    const sendReview = async () => {
        setLoading(true)
        try {
            const res = await axios.post(
                `https://backend.bitmoservice.com/api/resources/v1/client/create-review`, body,
                { headers }
            );
            console.log(res.data)
            setLoading(false)

            if (res.data.code == 200) {
                alert("Review submitted successfully!")
                setComment("")
                setIsCommunication(false)
                setIsPatience(false)
                setIsResponsiveness(false)
                setProfessionalism(false)
                setIsEfficiency(false)
                setIsFriendliness(false)
                setIsTimeliness(false)
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
            <Header navigation={navigation} title={"Review                      "} />

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.top}>
                        <Image source={{
                            uri: `https://backend.bitmoservice.com/${data?.img}`,
                        }}
                            style={{ height: 80, width: 80, borderRadius: 80 }}
                        />

                        <View style={{ marginVertical: 20, alignItems: "center", justifyContent: 'center' }}>
                            <Text>Below Average</Text>
                            <View style={{ flexDirection: "row" }}>

                                {stars.map((star, i) => (
                                    <Pressable onPress={() => isPressed(i)} key={i}>
                                        <Text> <Entypo name="star" size={24} color={stars[i][i] == 0 ? "#979797" : "#00709e"} /></Text>
                                    </Pressable>
                                ))}

                            </View>
                        </View>

                        <View>
                            <Text>How can {data.service_provider} improve?</Text>
                        </View>

                        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                            <Pressable onPress={() => setIsFriendliness(!isFriendliness)} style={isFriendliness ? styles.improve_recommendation : styles.improve}>
                                <Text style={{ color: isFriendliness ? "#fff" : "#000" }}>
                                    Friendliness
                                </Text>

                            </Pressable>
                            <Pressable onPress={() => setProfessionalism(!isProfessionalism)} style={isProfessionalism ? styles.improve_recommendation : styles.improve}>
                                <Text style={{ color: isProfessionalism ? "#fff" : "#000" }}>
                                    Professionalism
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setIsPatience(!isPatience)} style={isPatience ? styles.improve_recommendation : styles.improve}>
                                <Text style={{ color: isPatience ? "#fff" : "#000" }}>
                                    Patience
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setIsCommunication(!isCommunication)} style={isCommunication ? styles.improve_recommendation : styles.improve}>
                                <Text style={{ color: isCommunication ? "#fff" : "#000" }}>
                                    Communication
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setIsResponsiveness(!isResponsiveness)} style={isResponsiveness ? styles.improve_recommendation : styles.improve}>
                                <Text style={{ color: isResponsiveness ? "#fff" : "#000" }}>
                                    Responsiveness
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setIsEfficiency(!isEfficiency)} style={isEfficiency ? styles.improve_recommendation : styles.improve}>
                                <Text style={{ color: isEfficiency ? "#fff" : "#000" }}>
                                    Efficiency
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setIsTimeliness(!isTimeliness)} style={isTimeliness ? styles.improve_recommendation : styles.improve}>
                                <Text style={{ color: isTimeliness ? "#fff" : "#000" }}>
                                    Timeliness
                                </Text>
                            </Pressable>


                        </View>


                        <View style={styles.comment}>
                            <TextInput placeholder='Add a comment' multiline value={comment} onChangeText={setComment} />
                        </View>

                        <Text style={{ textAlign: "center" }}>Comments are anonymously shared with your servitor</Text>

                    </View>

                    <Pressable onPress={sendReview} style={({ pressed }) => [
                        {
                            opacity: pressed ? .5 : 1,
                            borderRadius: 20,
                            marginTop: 20,
                            alignItems: "center",
                            justifyContent: "center",
                            height: 40,
                            width: Dimensions.get("screen").width - 30,
                            backgroundColor: "#00709e"
                        }]}>{loading ? <ActivityIndicator color={"#fff"} /> : <Text style={{ color: "#fff", fontWeight: "700" }}>SEND</Text>}</Pressable>

                </ScrollView>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10
    },
    top: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10
    },
    improve: {
        backgroundColor: "#fff",
        height: 35,
        minWidth: 80,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        borderColor: "#b1b1b1",
        borderWidth: 1
    },
    improve_recommendation: {
        backgroundColor: "#0c8fc4",
        height: 35,
        minWidth: 80,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 5
    },
    comment: {
        marginTop: 50,
        width: Dimensions.get("screen").width - 30,
        borderColor: "#c0c0c0",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        paddingTop: 4,
        minHeight: 100,

    }
})