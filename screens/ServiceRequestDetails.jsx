import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { UIActivityIndicator } from 'react-native-indicators'
import SuccessScreen from './PaymentSuccessful'

export default function ServiceRequestDetails({ service_request_id, token, navigation, setOpenDetails, serviceDetailDesc }) {

    // console.log(navigation, "NAV")
    const [details, setDetails] = React.useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)
    const [openServitor, setOpenServitor] = useState(false)
    const [currentIndex, setCurrentIndex] = useState()
    const [servitor, setServitor] = useState()
    const [gotoMakePayment, setGotoMakePayment] = useState(false)
    const [orderData, setOrderData] = useState()
    const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 734,
    };

    React.useEffect(() => {

        const fetchServiceRequestsDetails = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(
                    `https://backend.bitmoservice.com/api/resources/v1/client/service-request-detail/${service_request_id}`,
                    { headers: header }
                );
                if (res.data.code == 200) {
                    setDetails(res.data.data);

                }
                setIsLoading(false);
                console.log("=====================")
            } catch (e) {
                console.log(e);
                setIsLoading(false);
            }
        };
        fetchServiceRequestsDetails();
    }, []);


    // console.log(details?.servitors.data[0], "DETAILS")
    const gotoNext = async (url) => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                url,
                { headers: header }
            );
            if (res.data.code == 200) {
                setDetails(res.data.data);

            }

            setIsLoading(false);
            console.log("=====================")
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    const placeOrder = async (servitor_id, i) => {
        setCurrentIndex(i)
        if (!isPlacingOrder) {
            setIsPlacingOrder(true)
            try {
                const res = await axios.post("https://backend.bitmoservice.com/api/resources/v1/client/place-post-request-order", { servitor_id: servitor_id }, {
                    headers: {
                        ...header, Resource_Code: 736,
                    }
                })
                console.log(res.data)
                if (res.data.code == 200) {
                    setOrderData(res.data.data)

                    setGotoMakePayment(true)
                    console.log(res.data.data)
                    // alert("Your Order was successful")
                }
                setIsPlacingOrder(false)

            } catch (e) {
                console.log(e)
                alert("An Error Occurred!")
                setIsPlacingOrder(false)
            }
        } else {
            alert("We are processing your request...")
        }
    }

    const openServitorDetails = (servitor, i) => {
        setServitor(servitor)
        setOpenServitor(true)
        setCurrentIndex(i)
    }

    let route = {
        params: {
            data: orderData
        }
    }

    console.log(route.params.data, "ROUTE PARAMWS")
    return (
        <>
            {
                gotoMakePayment ? <SuccessScreen navigation={navigation} route={route} setOpenDetails={setOpenDetails} /> : <View style={styles.container}>
                    <Header navigation={navigation} title={"   My Service Request Posts"} isDetails setOpenDetails={setOpenDetails} />
                    {
                        isLoading ? <UIActivityIndicator color='#00709e' /> :
                            <ScrollView>
                                {
                                    openServitor ? <ServitorDetails isPlacingOrder={isPlacingOrder} setOpenServitor={setOpenServitor} placeOrder={placeOrder} servitor={servitor} navigation={navigation} /> :
                                        <View style={styles.top}>
                                            <Image source={{ uri: `https://backend.bitmoservice.com/${serviceDetailDesc.img}` }} style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: "#e9e9e9" }} />
                                            <View style={{ marginLeft: 15, justifyContent: "space-between", height: 200 }}>
                                                <View>
                                                    <Text style={styles.title}>{details?.service}</Text>
                                                    <Text>{serviceDetailDesc.desc}</Text>
                                                </View>
                                                <View >
                                                    <Text>Appointment Schedule</Text>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={styles.title}>{details?.appointment_date}</Text>
                                                        <Text style={[styles.title, { marginLeft: 10 }]}>- {details?.duration}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text>Service Type</Text>
                                                    <Text style={styles.title}>{details?.service_type ? details?.service_type : "Not available"}</Text>
                                                </View>
                                                <View>
                                                    <Text>Location</Text>
                                                    <Text style={styles.title}>{details?.location}</Text>
                                                </View>
                                            </View>
                                        </View>
                                }
                                <View style={{ padding: 10 }}>
                                    {openServitor ? <Text style={[styles.title, { color: "#00709e", marginBottom: 10 }]}>Other servitors who applied</Text> : <Text style={[styles.title, { color: "#00709e", marginBottom: 10 }]}>{details?.total_servitor} servitors applied</Text>}
                                    {
                                        details?.servitors.data.length > 0 && details?.servitors.data.map((servitor, i) => (
                                            <View key={i} style={[styles.top, { marginBottom: 10, borderColor: "#cecdcd", borderWidth: 1, borderRadius: 15, minHeight: 200 }]}>
                                                <Image source={{ uri: `https://backend.bitmoservice.com/${servitor?.img}` }} style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: "#e9e9e9" }} />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Pressable onPress={() => openServitorDetails(servitor, i)} style={({ pressed }) => [{ opacity: pressed ? .5 : 1 }]}>
                                                        <Text style={styles.title}>{servitor.partner_name}</Text>
                                                        <Text style={{ color: "#a5a5a5" }}>{servitor.partner_address ? servitor.partner_address : "Not Available"}</Text>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <View style={{ flexDirection: "row", marginRight: 10 }}>
                                                                <Text>Rating</Text>
                                                                <AntDesign name='star' size={16} color="#f3d678" />
                                                                <Text>{servitor.rating}</Text>
                                                            </View>
                                                            <Text style={[styles.title, { marginRight: 10 }]}>{servitor.reviews} reviews</Text>
                                                            <Text>{servitor.followers} followers</Text>
                                                        </View>
                                                    </Pressable>

                                                    <View style={{ marginTop: 20, alignSelf: "center" }}>
                                                        <Text>Price for this service</Text>
                                                        <Text style={[styles.title, { marginLeft: 14, fontSize: 17, color: "#00709e" }]}>NGN {servitor.price}</Text>


                                                    </View>

                                                    <Pressable onPress={() => placeOrder(servitor.partner_id, i)} style={({ pressed }) => [{ marginTop: 30, alignSelf: "center", opacity: pressed ? .5 : 1, backgroundColor: "#00709e", alignItems: "center", justifyContent: "center", width: 100, padding: 15, paddingVertical: 7, borderRadius: 6 }]}>
                                                        {isPlacingOrder && currentIndex == i ? <ActivityIndicator color={"#fff"} /> : <Text style={{ color: "#fff" }}>Continue</Text>}
                                                    </Pressable>
                                                </View>
                                            </View>

                                        ))

                                    }

                                </View>
                                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, }}>

                                    {
                                        details?.servitors?.prev_page_url &&

                                        <Pressable onPress={() => gotoNext(details?.servitors?.next_page_url)} style={{ backgroundColor: "#dddddd", width: 110, flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, justifyContent: "space-between", alignItems: 'center', }}><Ionicons name="arrow-back" size={24} color="#00709e" /><Text style={{ color: "#00709e" }}>Prev Page</Text></Pressable>

                                    }

                                    {
                                        details?.servitors?.next_page_url &&
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: details?.servitors?.prev_page_url ? 110 : Dimensions.get("screen").width - 20, paddingRight: 15 }}>
                                            {!details?.servitors?.prev_page_url &&
                                                <View style={{ backgroundColor: "red" }} />
                                            }
                                            <Pressable onPress={() => gotoNext(details?.servitors?.next_page_url)} style={{ backgroundColor: "#dddddd", width: 110, flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, justifyContent: "space-between", alignItems: 'center' }}><Text style={{ color: "#00709e" }}>Next Page</Text><Ionicons name="arrow-forward" size={24} color="#00709e" /></Pressable>
                                        </View>
                                    }

                                </View>
                                <View style={{ height: 50 }} />
                            </ScrollView>

                    }

                </View>

            }
        </>

    )
}


const ServitorDetails = ({ servitor, setOpenServitor, placeOrder, currentIndex, isPlacingOrder, navigation }) => {

    return (
        <View style={[styles.top, { flexDirection: "column", marginBottom: 10, borderColor: "#cecdcd", borderWidth: 1, borderRadius: 15, minHeight: 200 }]}>
            <Pressable onPress={() => setOpenServitor(false)} style={{ flexDirection: "row", alignItems: "center", marginTop: -8, marginBottom: 8 }}><Ionicons name='arrow-back' color={"#00709e"} /><Text style={{ color: "#00709e", fontSize: 10 }}>Go back</Text></Pressable>
            <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: `https://backend.bitmoservice.com/${servitor?.img}` }} style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: "#e9e9e9" }} />
                <View style={{ marginLeft: 10 }}>
                    {/* <Pressable onPress={() => openServitorDetails(servitor)} style={({ pressed }) => [{ opacity: pressed ? .5 : 1 }]}> */}
                    <Text style={styles.title}>{servitor.partner_name}</Text>
                    <Text style={{ color: "#a5a5a5" }}>{servitor.partner_address ? servitor.partner_address : "Not Available"}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "row", marginRight: 10 }}>
                            <Text>Rating</Text>
                            <AntDesign name='star' size={16} color="#f3d678" />
                            <Text>{servitor.rating}</Text>
                        </View>
                        <Text style={[styles.title, { marginRight: 10 }]}>{servitor.reviews} reviews</Text>
                        <Text>{servitor.followers} followers</Text>
                    </View>
                </View>
                {/* </Pressable> */}
            </View>
            <View>
                <View style={{ marginTop: 20, alignItems: "center", justifyContent: "space-between", flexDirection: 'row' }}>
                    <Text>{servitor?.note}</Text>


                </View>
                <View style={{ marginTop: 20, alignItems: "center", justifyContent: "space-between", flexDirection: 'row' }}>
                    <Text>Price for this service</Text>
                    <Text style={[styles.title, { marginLeft: 14, fontSize: 17, color: "#00709e" }]}>NGN {servitor.price}</Text>


                </View>

                <Pressable onPress={() => placeOrder(servitor.partner_id, currentIndex)} style={({ pressed }) => [{ marginTop: 40, alignSelf: "center", opacity: pressed ? .5 : 1, backgroundColor: "#00709e", alignItems: "center", justifyContent: "center", width: Dimensions.get("screen").width - 20, padding: 15, paddingVertical: 7, borderRadius: 10 }]}>
                    {isPlacingOrder ? <ActivityIndicator color={"#fff"} /> : <Text style={{ color: "#fff" }}>Place Order</Text>
                    }

                </Pressable>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    top: {
        flexDirection: "row",
        padding: 15,
        borderBottomColor: "#cecdcd",
        borderBottomWidth: 1
    },
    title: {
        fontWeight: "700"
    }
})