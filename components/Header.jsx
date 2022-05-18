import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
  Pressable,
  ScrollView
} from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
const logo = require("../assets/images/logos/Bytmos.png");
import { useSelector } from "react-redux";

export default function Header({ navigation, home, search, title, isDetails, setOpenDetails }) {
  const user = useSelector((state) => state.user);

  const token = user?.userData?.token;

  const [searchValue, setSearchValue] = useState('')
  const [searcho, setSearch] = useState(search);
  const [searchHasValue, setSearchHasValue] = useState(false);
  const [loading, setLoading] = useState(false)
  const [searchResponse, setSearchResponse] = useState([]);

  const header = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: 730,
  };

  const searchCategories = async () => {

    if (searchValue.length > 0) {
      setSearchHasValue(true)
      setLoading(true)
      try {
        const response = await axios.post('https://backend.bitmoservice.com/api/resources/v1/client/search-service', { search: searchValue }, { headers: header })
        console.log(response.data)
        setSearchResponse(response.data.data)
        setLoading(false)
        if (response.data?.data?.length > 0) {
          setSearchHasValue(true)
        } else {
          setSearchHasValue(false)

        }

      } catch (e) {
        console.log(e)
        setLoading(false)
        setSearchHasValue(false)
      }
    }
  }

  const openServiceProviders = (id) => {
    navigation.push("Service", { id: id })
    setSearchHasValue(false)
  }
  const SearchResult = () => (
    <View style={{ position: 'absolute', padding: 10, paddingBottom: 20, top: 80, width: Dimensions.get("screen").width, minHeight: 50, elevation: 2, zIndex: 10, backgroundColor: '#fff', }}>
      {loading ? <UIActivityIndicator size={17} color="#7fc7e4" /> : <ScrollView >
        {searchResponse.map((response, i) => (
          <Pressable key={i} onPress={() => openServiceProviders(response.sub_category_id)}
            style={({ pressed }) => [{ flexDirection: 'row', alignItems: 'center', borderBottomColor: "#cacaca", borderBottomWidth: 1, paddingBottom: 6, opacity: pressed ? .5 : 1 }]} >
            <Image source={{ uri: `https://backend.bitmoservice.com/${response.img}` }} style={{ width: 30, height: 30, borderRadius: 30 }} />
            <Text style={{ marginLeft: 10 }}>{response.name}</Text>
          </Pressable>
        ))}
      </ScrollView>}
    </View>
  )


  return (
    <>
      <Pressable onPress={() => setSearch(false)} style={styles.container}>
        <StatusBar backgroundColor="#00709e" />
        <View style={styles.top}>
          <View style={[styles.topLeft, { paddingVertical: searcho ? 0 : 10 }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: Dimensions.get("screen").width / 2.15,
                alignItems: "center",
              }}
            >
              {home ? (
                <Pressable
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                  onPress={() => navigation.openDrawer()}
                >
                  <Feather name="menu" color="#fff" size={24} />
                </Pressable>
              ) : (
                navigation && (
                  <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                    onPress={isDetails ? () => setOpenDetails(false) : () => navigation.goBack()}
                  >
                    <AntDesign name="leftcircle" size={24} color="#fff" />
                  </Pressable>

                )
              )}

              {title ? (
                <Text numberOfLines={1} style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>
                  {title}
                </Text>
              ) : (
                <Image source={logo} style={{ height: 30, width: 130 }} />
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                width: searcho ? 65 : 100,
                justifyContent: "space-between",
              }}
            >
              {!searcho && (
                <Pressable
                  onPress={() => setSearch(true)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                >
                  <Feather name="search" size={24} color="#fff" />
                </Pressable>
              )}
              <View>
                <Ionicons name="chatbubble-ellipses" color="#fff" size={24} />
              </View>
              <View>
                <Ionicons name="notifications" size={24} color="#fff" />
              </View>
            </View>
          </View>

          <View style={styles.topRight}></View>
        </View>

        {searcho && (
          <View style={styles.form}>
            <TextInput
              placeholder="What are you looking for?"
              style={styles.formInput}
              value={searchValue}
              onChangeText={setSearchValue}
              onSubmitEditing={searchCategories}
            />
          </View>
        )}
      </Pressable>
      {searchHasValue && <SearchResult />}
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00709e",
    // paddingTop: StatusBar.currentHeight,
  },
  top: {
    // marginTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  topLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topRight: {},
  form: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  formInput: {
    backgroundColor: "#fff",
    borderRadius: 16,
    height: 38,
    paddingHorizontal: 17,
    fontSize: 16,
  },
});
