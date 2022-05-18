import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, Pressable, Image } from "react-native";

const Request = ({ request, navigation }) => {
  console.log(request, "REQUEST.....")
  return (
    <Pressable
      onPress={() => navigation.push("History", { request })}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          paddingHorizontal: 10,
          paddingBottom: 20,
          marginVertical: 10,
          elevation: 2,
          marginHorizontal: 15,
          backgroundColor: "#fff",
          borderRadius: 10,
          minHeight: 250,
          minWidth: 300,
        },
      ]}
    >
      {request.status == "Approved" &&(
        <View
          style={{
            backgroundColor: "#176cd4",
            alignSelf: "center",
            width: 100,
            padding: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {request.status && request.status}
          </Text>
        </View>
      )}
      {request.status == "pending" && (
        <View
          style={{
            backgroundColor: "#c2c75d",
            alignSelf: "center",
            width: 100,
            padding: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {request.status&&request.status}
          </Text>
        </View>
      )}
      {request.status == "Completed" && (
        <View
          style={{
            backgroundColor:  "#319df7",
            alignSelf: "center",
            width: 100,
            padding: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {request.status&&request.status}
          </Text>
        </View>
      )}
      {request.status == "Unapproved" && (
        <View
          style={{
            backgroundColor:  "grey",
            alignSelf: "center",
            width: 100,
            padding: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {request.status&&request.status}
          </Text>
        </View>
      )}
      {request.status == "Terminated" && (
        <View
          style={{
            backgroundColor:  "red",
            alignSelf: "center",
            width: 100,
            padding: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {request.status&&request.status}
          </Text>
        </View>
      )}
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#787878",
            textAlign: "center",
          }}
        >
          {request.date? request.date : 0}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <View
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              backgroundColor: "#319df7",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={{uri: `https://backend.bitmoservice.com/${request.img}`}} style={{width:36, height:36, borderRadius:36}} />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#787878" }}>
              Service:
            </Text>

            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#4f4e4e" }}
            >
              {request.service && request.service}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: -18,
                color: "#4f4e4e",
              }}
            >
              {!request.service && ""}
            </Text>
          </View>
        </View>
        
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <View
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              backgroundColor: "#319df7",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="location-pin" size={24} color="#fff" />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#787878" }}>
              Delivery Location:
            </Text>

            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#4f4e4e" }}
            >
              {request.location && request.location}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: -18,
                color: "#4f4e4e",
              }}
            >
              {!request.location && "Not available"}
            </Text>
          </View>
        </View>
        
        
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <View
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              backgroundColor: "#319df7",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="clock" size={24} color="#fff" />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#787878" }}>
              Appointment Time:
            </Text>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#4f4e4e" }}
            >
              {request.appointment_time? request.appointment_time : 0}
            </Text>
          </View>
        </View>
        <View>{/* size={24} color="black" /> */}</View>
      </View>
    </Pressable>
  );
};

export default Request;
