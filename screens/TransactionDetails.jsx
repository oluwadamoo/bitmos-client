import { View, Text, StyleSheet, Dimensions, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { UIActivityIndicator } from 'react-native-indicators'
import { AntDesign } from '@expo/vector-icons';
export default function TransactionDetails({ navigation, route }) {
    const user = useSelector((state) => state.user);

    const token = user?.userData.token;

    const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 509,
    };

    const [transferFundDetails, setTransferFundDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    let transaction = route.params.transaction
    // console.log(transaction, "TRANSACTION...")
    let fund_id = transaction?.type ? transaction.fund_id : transaction.deposit_id
    let uri = transaction?.type ? `https://backend.bitmoservice.com/api/resources/v1/client/fund-details/${fund_id}` : `https://backend.bitmoservice.com/api/resources/v1/client/deposit-deposit/${fund_id}`
    const getFundDetails = async () => {
        // console.log(fund_id, "FUND ID")
        setIsLoading(true)
        try {
            const res = await axios.get(
                uri,
                { headers: transaction?.type ? header : { ...header, Resource_Code: 502 } }
            );
            // console.log(res.data)
            setTransferFundDetails(res.data.data)
            console.log(res.data.data, "FUND DETAILS")
            setIsLoading(false)
        } catch (e) {
            console.log(e)
            setIsLoading(false)

        }
    }
    useEffect(() => {
        getFundDetails()
    }, [transaction])
    return (
        <>
            <Header navigation={navigation} title={transaction?.type ? `  ${transaction?.type}                         ` : " Topup                          "} />
            {isLoading ? (
                <View style={{ marginTop: Dimensions.get("screen").height / 2.5, backgroundColor: "#fff" }}>
                    <UIActivityIndicator color={"#00709e"} />
                </View>
            ) :
                <View style={styles.container}>
                    <ScrollView>
                        {transaction?.type ?
                            <View style={styles.transferTop}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>

                                    <Image source={{
                                        uri: transferFundDetails?.photo.includes('http') ? transferFundDetails.photo : `https://backend.bitmoservice.com/${transferFundDetails.photo}`,

                                    }}
                                        style={{ height: 50, width: 50, borderRadius: 30 }}
                                    />
                                    <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 10 }}>{transferFundDetails.name ? transferFundDetails.name : "No name"}</Text>
                                    <Text style={{ color: "#969696" }}>{transferFundDetails.label}</Text>
                                    <Text style={{ color: "#00709e", fontSize: 19.5, fontWeight: "700", marginTop: 10 }}>NGN {transaction.total}</Text>

                                    {/* <Text style={{ color: "#000", marginTop: 10, fontSize: 18, textAlign: "center" }}>NGN {transaction.total}</Text> */}
                                </View>
                            </View> :
                            <View style={styles.top}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                    <Text style={styles.top_text}>Amount</Text>
                                    <Text style={[styles.top_text, { fontSize: 15 }]}>NGN {transferFundDetails.amount}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                    <Text style={styles.top_text}>Charges</Text>
                                    <Text style={[styles.top_text, { fontSize: 15 }]}>{transferFundDetails?.vat && `NGN ${transferFundDetails.vat}`}</Text>
                                </View>
                                {/* {transaction?.vat && <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.top_text}>Total</Text>
                                    <Text style={[styles.top_text, { fontSize: 15 }]}>{transferFundDetails?.vat ? `NGN ${transferFundDetails.amount + transferFundDetails.vat}` : `NGN ${transferFundDetails.amount}`}</Text>
                                </View>} */}
                            </View>}

                        <View style={styles.payment}>
                            <View style={styles.paymentCont}>
                                <Text>Payment Type</Text>
                                <Text>{!transaction?.type ? transferFundDetails.payment_type : transaction?.type}</Text>
                            </View>
                            <View style={styles.paymentCont}>
                                <Text>Date</Text>
                                <Text>{transaction.date}</Text>
                            </View>
                            {!transaction.type && <View style={styles.paymentCont}>
                                <Text>Topup ID</Text>
                                <Text>{transferFundDetails.transaction_id}</Text>
                            </View>}
                            <View style={styles.paymentCont}>
                                <Text>Reference ID</Text>
                                <Text>{transaction.ref_id}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>Status</Text>
                                <Text style={{ color: transaction?.status == "pending" ? "#f3974c" : "#50f34a" }}>{transaction.status}</Text>
                            </View>
                        </View>

                        {transferFundDetails?.card_details &&
                            <>
                                <Text style={{ marginTop: 10, marginBottom: -7, marginLeft: 10 }}>Card Details</Text>

                                <View style={styles.payment}>
                                    <View style={[styles.paymentCont, { flexDirection: 'column' }]}>
                                        <Text style={{ marginTop: -10 }}>Account Name</Text>
                                        <Text style={{ fontWeight: '700', marginTop: 5 }}>{transferFundDetails.card_details?.account_name}</Text>
                                    </View>

                                    <View style={[styles.paymentCont, { flexDirection: 'column' }]}>
                                        <Text style={{ marginTop: -10 }}>Bank Name</Text>
                                        <Text style={{ fontWeight: '700', marginTop: 5 }}>{transferFundDetails.card_details?.bank}</Text>
                                    </View>
                                    <View style={[styles.paymentCont, { flexDirection: 'column' }]}>
                                        <Text style={{ marginTop: -10 }}>Card Type</Text>
                                        <Text style={{ fontWeight: '700', marginTop: 5 }}>{transferFundDetails.card_details?.card_type}</Text>
                                    </View>
                                    <View style={[styles.paymentCont, { flexDirection: 'column' }]}>
                                        <Text style={{ marginTop: -10 }}>Last Four Digits</Text>
                                        <Text style={{ fontWeight: '700', marginTop: 5 }}>{transferFundDetails.card_details?.last_four_digit}</Text>
                                    </View>
                                    <View style={[styles.paymentCont, { flexDirection: 'column' }]}>
                                        <Text style={{ marginTop: -10 }}>Expiry Date</Text>
                                        <Text style={{ fontWeight: '700', marginTop: 5 }}>{transferFundDetails.card_details?.expire_date}</Text>
                                    </View>

                                </View>
                            </>}


                    </ScrollView>
                    {transaction?.type && transferFundDetails?.reject_button != false && <View>
                        <Pressable style={({ pressed }) => [{ flexDirection: "row", justifyContent: "space-between", padding: 10, alignItems: "center", opacity: pressed ? .5 : 1, height: 40, width: 96, backgroundColor: "#919191", borderRadius: 10 }]}>
                            <AntDesign name="close" size={18} color="#fff" />
                            <Text style={{ color: "#fff", fontWeight: "700" }}>Decline</Text>
                        </Pressable>
                    </View>}
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        justifyContent: "space-between"


    },
    top: {
        backgroundColor: "#00709e",
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10

    },
    top_text: {
        color: "#fff",
        fontWeight: "700"
    },
    payment: {

        padding: 10,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: "#cccc",
        borderRadius: 10
    },
    paymentCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#d6d6d6",
        borderBottomWidth: 1,
        marginBottom: 20,
        marginTop: 10
    },
    transferTop: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    }

})