import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  Share,
} from "react-native";
import { AntDesign, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";

const TribeCard = ({ category, navigation, openReviews, setOpenReviews }) => {
  // const [] = useState(false);
  const [show, setShow] = useState(false);

  let noOfLines = 2;

  const share = async () => {
    try {
      const result = await Share.share(
        {
          message:
            "Sonia's fashion styles just launched a new fleet of wedding...",
          url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
          title: "Sonia Fashion Styles",
        },
        {
          dialogTitle: "Share Sonia's post with...",
        }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result, "result from activity type");
        } else {
          console.log(result, " from shared");
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log(result, " from dismissed");
      }
    } catch (e) {
      alert(error.message);
    }
  };

  const showAll = () => {
    setShow(true);

    console.log(show);
    if (show == true) {
      noOfLines = null;
    }

    console.log(noOfLines);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <Pressable
            onPress={() => navigation.navigate("Tribe Profile")}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
              style={styles.userImg}
            />
            <View>
              <Text style={[styles.hText, { fontSize: 16 }]}>
                Sonia Fashion Styles
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text]}>Rating </Text>
                <AntDesign name="star" size={15} color="#e2d029" />
                <Text style={[styles.text]}>5.0</Text>
              </View>
            </View>
          </Pressable>
          <View>
            <Text style={{ color: "#00709e", fontWeight: "700" }}>
              Tribe
            </Text>
          </View>
        </View>

        <View style={styles.cardTextContainer}>
          <View style={{ flexDirection: "row", height: 35 }}>
            <Text
              style={[styles.text, styles.cardText]}
              numberOfLines={noOfLines}
              ellipsizeMode="tail"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
              aspernatur, incidunt illum sapiente atque commodi tempora facere.
              Vel eligendi, soluta, repudiandae accusamus totam, ex eius facilis
              voluptatibus a quibusdam distinctio.
            </Text>
            <Pressable
              onPress={showAll}
              style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1, alignSelf: "flex-end" },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: "#888585",
                    fontSize: 13,

                    // marginTop: 15,
                  },
                ]}
              >
                See more
              </Text>
            </Pressable>
          </View>
          <Text style={(styles.text, { color: "#888585", fontSize: 13 })}>
            August 30
          </Text>
        </View>

        <View style={styles.image}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            }}
            style={{ width: "100%", height: 380 }}
          />
        </View>

        <View style={styles.footer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 100,
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("Comment")}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <Ionicons name="chatbubbles" size={24} color="#5c5c5c" />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <Ionicons name="heart" size={24} color="red" />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Share Post")}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <FontAwesome name="send" size={24} color="#5c5c5c" />
              </Pressable>
            </View>
            <Pressable
              onPress={share}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  alignSelf: "flex-end",
                },
              ]}
            >
              <Entypo name="share" size={24} color="#5c5c5c" />
            </Pressable>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.hText]}>2,434 Likes</Text>
            <Pressable
              onPress={() => setOpenReviews(true)}
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
              <Text style={[styles.text, { color: "#00709e" }]}>
                544 Reviews
              </Text>
            </Pressable>
          </View>
        </View>

        {!openReviews && (
          <View
            style={{
              height: 0.3,
              width: "100%",
              backgroundColor: "#5e5c5ca7",
              marginTop: 10,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default TribeCard;

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    position: "relative",
  },
  top: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userImg: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 6,
  },
  cardTextContainer: {
    // flexDirection: "row",
    position: "relative",
    marginBottom: 5,
  },
  cardText: {
    width: "80%",
  },
  image: {
    position: "relative",
  },
  footer: {
    marginTop: 10,
    paddingHorizontal: 5,
  },

});
