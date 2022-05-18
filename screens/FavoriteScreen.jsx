import { FontAwesome5, Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Favorite from "../components/Favorite";

import { useNavigation } from "@react-navigation/core";
import Header from "../components/Header";
import { useSelector } from "react-redux";

import axios from "axios";
export default function FavoriteScreen() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const token = user?.userData.token;

  useEffect(() => {
    const getFavPartners = async () => {
      setIsLoading(true);
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: 704,
        };

        const res = await axios.get(
          `https://backend.bitmoservice.com/api/resources/v1/client/favorites`,
          { headers: header }
        );
        setPartners(res.data.data.favorites);

        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    getFavPartners();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header home />
      <Pressable
        style={{
          marginLeft: 10,
          marginTop: 10,
          // backgroundColor: "#ffffff83",
          height: 40,
          width: 80,
          position: "absolute",
        }}
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" color="#fff" size={24} />
      </Pressable>
      <View style={styles.wrapper}>
        <View style={styles.favorites}>
          <FontAwesome5 name="heart" size={80} color="#bbbdbb" />
          {partners.length < 1 && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                fontWeight: "500",
              }}
            >
              No favorite partner added!
            </Text>
          )}
          {/* <Text>{partners[0].partner_name}</Text> */}
        </View>

        {isLoading ? (
          <ActivityIndicator color="blue" style={{ marginTop: 50 }} />
        ) : (
          partners.map((partner, index) => (
            <Favorite
              navigation={navigation}
              partner={partner}
              key={index}
              token={token}
            />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    padding: 10,
  },
  favorites: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
});
