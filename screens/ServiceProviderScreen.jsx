import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ServiceProviders from "../components/ServiceProviders";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  UIActivityIndicator,
} from 'react-native-indicators';

import { useSelector } from "react-redux";


const ServiceProviderScreen = ({ route, navigation }) => {
  const user = useSelector((state) => state.user);
  const token = user?.userData.token;

  const id = route.params.id;



  // console.log(id, "ID wey you no see")
  // const navigation = useNavigation();
  const [serviceProviders, setServiceProviders] = useState([]);
  const [recommendedProviders, setRecommendedProviders] = useState([]);
  const [allProviders, setAllProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [closeOthers, setCloseOthers] = useState(false);


  useEffect(() => {

    const getServiceProvidersNear = async () => {
      setIsLoading(true);
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: 700,
        };

        const res = await axios.get(
          `https://backend.bitmoservice.com/api/resources/v1/client/service-providers-near-you/${id}`,
          { headers: header }
        );

        setServiceProviders(res.data.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        alert("Error");
        setIsLoading(false);
      }
    };
    const getRecommendedProviders = async () => {
      setIsLoading(true);
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: 701,
        };

        const res = await axios.get(
          `https://backend.bitmoservice.com/api/resources/v1/client/recommended-service-providers/${id}`,
          { headers: header }
        );

        setRecommendedProviders(res.data.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        alert("Error");
        setIsLoading(false);
      }
    };
    const getAllProviders = async () => {
      setIsLoading(true);
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: 702,
        };

        const res = await axios.get(
          `https://backend.bitmoservice.com/api/resources/v1/client/all-service-providers/${id}`,
          { headers: header }
        );

        setAllProviders(res.data.data.service_providers);
        setIsLoading(false);
        console.log(allProviders.service_providers, "all providers........");
      } catch (e) {
        console.log(e);
        alert("Error");
        setIsLoading(false);
      }
    };
    getServiceProvidersNear();
    getAllProviders();
    getRecommendedProviders();
  }, []);



  return (
    <>
      <Header navigation={navigation} />
      <ScrollView style={styles.container}>
        <View>
          {!closeOthers && (
            <>
              <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 17 }}>
                Service Providers closest to you
              </Text>
              {isLoading ? (
                <UIActivityIndicator color="#00709e" size={20} />

              ) : recommendedProviders.length < 1 ? (
                <View style={{ paddingHorizontal: 10 }}>
                  <Text
                    style={{
                      color: "#7e7e7e",
                      fontWeight: "600",

                      fontSize: 17,
                    }}
                  >
                    No Data To Display
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={serviceProviders}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ServiceProviders item={item} navigation={navigation} id={id} />
                  )}
                />
              )}

              <Text
                style={{ marginLeft: 10, marginVertical: 10, fontSize: 17 }}
              >
                Also Recommended
              </Text>

              {isLoading ? (
                <UIActivityIndicator color="#00709e" size={20} />
              ) : recommendedProviders.length < 1 ? (
                <View style={{ paddingHorizontal: 10 }}>
                  <Text
                    style={{
                      color: "#7e7e7e",
                      fontWeight: "600"
                        ? "fira-semibold"
                        : "san-serif",
                      fontSize: 17,
                    }}
                  >
                    No Data To Display
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={recommendedProviders}
                  horizontal
                  renderItem={({ item }) => (
                    <ServiceProviders item={item} navigation={navigation} id={id} />
                  )}
                />
              )}
            </>
          )}

          <Pressable
            onPress={() => setCloseOthers(!closeOthers)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                height: 30,
                width: Dimensions.get("screen").width - 100,
                backgroundColor: "#00709e",
                borderRadius: 8,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 15,
              },
            ]}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              {closeOthers ? "Close" : "See All Providers"}
            </Text>
          </Pressable>
          {closeOthers && (
            <>
              <Text
                style={{ marginLeft: 10, marginVertical: 10, fontSize: 17 }}
              >
                All Providers
              </Text>
              {isLoading ? (
                <UIActivityIndicator color="#00709e" size={20} />
              ) : allProviders.length < 1 ? (
                <View style={{ paddingHorizontal: 10, alignItems: "center", justifyContent: "center" }}>
                  <Text
                    style={{
                      color: "#7e7e7e",
                      fontWeight: "600"
                        ? "fira-semibold"
                        : "san-serif",
                      fontSize: 17,
                    }}
                  >
                    No Data To Display
                  </Text>
                </View>
              ) : (
                <FlatList
                  horizontal
                  data={allProviders}
                  renderItem={({ item }) => (
                    <ServiceProviders item={item} navigation={navigation} id={id} />
                  )}
                />
              )}
            </>
          )}
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </>
  );
};

export default ServiceProviderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  wrapper: {},
});
