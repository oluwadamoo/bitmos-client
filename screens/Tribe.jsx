import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import Header from "../components/Header";
import TribeCard from "../components/TribeCard";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tribe = () => {
  const navigation = useNavigation();
  const [openReviews, setOpenReviews] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00709e" />
      <Header home />
      <Pressable
        style={{
          marginLeft: 10,
          marginTop: 11,
          // backgroundColor: "#ffffff83",
          height: 40,
          width: 80,
          position: "absolute",
        }}
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" color="#fff" size={24} />
      </Pressable>
      <ScrollView style={styles.wrapper}>
        <Text style={{ fontWeight: "500", fontSize: 17 }}>
          Connect and share with people in your space of interest
        </Text>

        <ScrollView
          style={styles.interestSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            style={({ pressed }) => [
              styles.interest,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text>Event</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.interest,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text>Automobile</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.interest,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text>Fashion</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.interest,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text>Tech</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.interest,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text>Travel</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.interest,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text>Agriculture</Text>
          </Pressable>
        </ScrollView>

        <View style={{ marginBottom: 80 }}>
          <TribeCard
            navigation={navigation}
            openReviews={openReviews}
            setOpenReviews={setOpenReviews}
          />
          <TribeCard navigation={navigation} />
          <TribeCard navigation={navigation} />
        </View>

        {/* <View style={{ height: 50 }} /> */}
      </ScrollView>
      <Pressable
        // onPress={() => navigation.navigate("Share Post")}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            // position: "fixed",
            right: 20,

            bottom: 20,
            position: "absolute",
            height: 36,
            width: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00709e",
            elevation: 100,
          },
        ]}
      >
        <Entypo name="plus" size={28} color="#fff" />
      </Pressable>

      {/* Review............. */}
      {openReviews && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            minHeight: 150,
            width: "100%",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderRadius: 10,
            padding: 10,
            elevation: 3,
          }}
        >
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                onPress={() => setOpenReviews(false)}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    backgroundColor: pressed ? "#0e9cd4b2" : "transparent",
                    borderRadius: pressed ? 10 : 0,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Ionicons name="chevron-back-sharp" size={24} color="#00709e" />
              </Pressable>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 15,
                }}
              />
              <View>
                <Text style={{ fontSize: 17, fontWeight: "700" }}>
                  Sonia Fashion Styles
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontWeight: "500" }}>5.0</Text>
                  <Text style={{ fontWeight: "500" }}>
                    ( 256 reviews)
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                height: 0.5,
                backgroundColor: "#aaaaaa",
                marginVertical: 10,
              }}
            />

            <Text style={{ fontWeight: "700", fontSize: 15 }}>
              Reviews
            </Text>

            {/* Each review.... */}
            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 15,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "700" }}>
                    Glen Johnson
                  </Text>
                  <View
                    style={{
                      width: 80,
                      marginLeft: Dimensions.get("screen").width / 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        color: "#f0b15f",
                        alignSelf: "flex-end",
                      }}
                    >
                      5.0
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        alignSelf: "flex-end",
                      }}
                    >
                      2 days ago
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={{ fontWeight: "500" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ratione provident qui corporis non aut eius ipsum!
                Necessitatibus quam nam aliquam hic minus corrupti beatae nihil
                tenetur. Quidem unde velit autem?
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 15,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "700" }}>
                    Glen Johnson
                  </Text>
                  <View
                    style={{
                      width: 80,
                      marginLeft: Dimensions.get("screen").width / 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        color: "#f0b15f",
                        alignSelf: "flex-end",
                      }}
                    >
                      5.0
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        alignSelf: "flex-end",
                      }}
                    >
                      2 days ago
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={{ fontWeight: "500" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ratione provident qui corporis non aut eius ipsum!
                Necessitatibus quam nam aliquam hic minus corrupti beatae nihil
                tenetur. Quidem unde velit autem?
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Tribe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    padding: 10,
  },
  interestSlide: {
    marginTop: 10,
  },
  interest: {
    backgroundColor: "#fff",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    paddingHorizontal: 15,
    borderRadius: 7,
    color: "#747272",
    borderColor: "#747272",
    borderWidth: 1,
  },
});
