import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { MaterialIcons } from '@expo/vector-icons';

const first = require("../assets/welcome/first.jpg")
const second = require("../assets/welcome/second.jpg")
const third = require("../assets/welcome/third.jpg")


const width = Dimensions.get("screen").width
const Welcome = ({ navigation }) => {
    const [isWelcome, setIsWelcome] = useState(true)
    const [gotoServe, setGotoServe] = useState(false)
    const [gotoSafe, setGotoSafe] = useState(false)

    const WelcomeBody = ({ title, content, image }) => (
        <View style={styles.bodyContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
            <Image source={image} style={{ width: width, height: Dimensions.get("screen").height / 2, resizeMode: 'contain' }} />
        </View>
    )

    const onSwipe = (type, gestureState) => {
        console.log(gestureState)
        switch (type) {
            case 'welcome':
                setIsWelcome(false)
                setGotoServe(true)
                break;
            case 'serve':
                setGotoSafe(true)
                setGotoServe(false)
                break;

            default:
                break;
        }
    }
    const onSwipeLeft = (type, gestureState) => {
        // console.log(gestureState)
        console.log("here....")
        switch (type) {
            case 'welcome':
                setIsWelcome(true)
                setGotoServe(false)
                setGotoSafe(false)
                break;
            case 'safe':
                console.log("here....")
                setGotoServe(true)
                setGotoSafe(false)
                setIsWelcome(false)

                break;

            default:
                break;
        }
    }
    const config = {
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 30
    };

    // console.log(gotoServe, "serve")
    // console.log(isWelcome, "welcome")
    // console.log(gotoSafe, "safe")
    return (
        <View style={styles.container}>
            {isWelcome && <GestureRecognizer config={config} onSwipeRight={() => onSwipeLeft('welcome')} onSwipeLeft={() => onSwipe('welcome')} style={styles.wrapper}>
                <WelcomeBody title={"Welcome to Bytmos"} image={first} content={"Get smart , instant services wherever you are with your bytmos mobile app"} />

            </GestureRecognizer>}
            {gotoServe && <GestureRecognizer config={config} onSwipeRight={() => onSwipeLeft('welcome')} onSwipeLeft={() => onSwipe('serve')} style={styles.wrapper}>
                <WelcomeBody title={"Get served by the best around you"} image={second} content={"Meet and get connected with our verified community of servitors closest to your location"} />

            </GestureRecognizer>}
            {gotoSafe && <GestureRecognizer config={config} onSwipeRight={() => onSwipeLeft('safe')} style={styles.wrapper}>
                <WelcomeBody title={"Safe Transactions"} image={third} content={"Make payments safely and seamlessly with Bytmos' trusted payment system"} />

            </GestureRecognizer>}


            <View style={styles.footer}>
                <View style={[styles.footerDots, { backgroundColor: isWelcome ? "#00709e" : "#fff" }]} />
                <View style={[styles.footerDots, { backgroundColor: gotoServe ? "#00709e" : "#fff" }]} />
                <View style={[styles.footerDots, { backgroundColor: gotoSafe ? "#00709e" : "#fff" }]} />

            </View>
            {gotoSafe && <Pressable onPress={() => navigation.push("Login")} style={({ pressed }) => [{ opacity: pressed ? .5 : 1, alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 15, height: 50, width: 200, backgroundColor: '#00709e', elevation: 1, zIndex: 100 }]}><Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', marginRight: 10 }}>Get Started</Text><MaterialIcons name="arrow-forward-ios" size={20} color="#fff" /><MaterialIcons name="arrow-forward-ios" size={20} color="#fff" style={{ marginLeft: -10 }} /></Pressable>}
            {/* <View style={{ height: 30 }} /> */}
            {/* <Pressable style={({ pressed }) => [{ opacity: pressed ? .5 : 1, alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 15, height: 2, width: 200, backgroundColor: '#fff', }]} /> */}
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 0
    },
    bodyContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 30
    },
    wrapper: {
        flex: 9
    },
    content: {
        marginBottom: 10,
        fontSize: 17,
        textAlign: 'center'

    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
        // backgroundColor: 'red'
    },
    footerDots: {
        marginTop: -30,
        width: 15,
        height: 15,
        borderColor: '#cccccc',
        borderWidth: 1,
        // backgroundColor: 'red',
        borderRadius: 10,
        marginHorizontal: 10
    }


})