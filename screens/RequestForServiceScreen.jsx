import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import OrderServices from "../components/OrderServices";
import Review from "../components/Review";
import Reviews from "../components/Reviews";
import SocialAccounts from "../components/SocialAccounts";
// const serviceImg = require("../assets/images/samples/event-bartending-service@event.jpg");
const avatar = require("../assets/images/avatars/male_avatar.png");
const serviceImg = require("../assets/images/samples/bartending-service.png");
import axios from "axios";
import { useSelector } from "react-redux";
import { UIActivityIndicator } from "react-native-indicators";
import ShowMap from "../components/ShowMap";

const ServiceProviderScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const id = route.params.id
  const service = route.params.service;
  const [loading, setLoading] = useState(false);
  const partner_id = route.params.partner_id
  // console.log(route.params, "route")
  // console.log(
  //   "====================================================================="
  // );
  const [services, setServices] = useState([]);
  const [partner, setPartner] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [updateFav, setUpdateFav] = useState(false);
  const [recommendedProviders, setRecommendedProviders] = useState([]);
  const [relatedServices, setRelatedServices] = useState([]);
  const [relatedProviders, setRelatedProviders] = useState([]);
  const [reviews, setReviews] = useState([])
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState()
  const [region, setRegion] = React.useState({
    latitude: 6.601838,
    longitude: 3.351486,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const user = useSelector((state) => state.user);

  const token = user?.userData.token;

  const getService = async () => {
    setLoading(true);
    try {
      const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 708,
      };

      const res = await axios.get(
        `https://backend.bitmoservice.com/api/resources/v1/client/service/${service.service_id}`,
        { headers: header }
      );

      setServices(res.data.data)
      // setServiceProviders(res.data.data);
      setLoading(false);

      console.log(res.data.data, "CATALOGUE")
      setReviews(res.data.data.reviews)
    } catch (e) {
      console.log(e);
      alert("Error");
      setIsLoading(false);
    }
  };

  // const getRecommendedProviders = async () => {
  //   setIsLoading(true);
  //   try {
  //     const header = {
  //       Authorization: `Bearer ${token}`,
  //       Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
  //       App_No: "07fix32665",
  //       Resource_Code: 701,
  //     };

  //     const res = await axios.get(
  //       `https://backend.bitmoservice.com/api/resources/v1/client/recommended-service-providers/${id}`,
  //       { headers: header }
  //     );

  //     setRecommendedProviders(res.data.data);
  //     setIsLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //     alert("Error");
  //     setIsLoading(false);
  //   }
  // };


  useEffect(() => {
    const getFavorites = async () => {
      try {
        setIsLoading(true);

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

        setFavorites(res.data.data.favorites);
        setIsLoading(false);
      } catch (e) {
        console.log(e);

        setIsLoading(false);
      }
    };

    const getServiceProviderService = async () => {
      try {
        setIsLoading(true);

        const header = {
          Authorization: `Bearer ${token}`,
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: 703,
        };

        const res = await axios.get(
          `https://backend.bitmoservice.com/api/resources/v1/client/services/${item.sub_category_id}/${item.partner_id}`,
          { headers: header }
        );

        console.log(item.sub_category_id, "SUB CAT");


        // setServices(res.data.data.service);
        // setPartner(res.data.data.partner);

        for (var i = 0; i < favorites.length; i++) {
          if (favorites[i].partner_id == item.partner_id) {
            // console.log(favorites[i].partner_id, item.partner_id);
            setIsFavorite(true);
            setFavorites(favorites[i]);
          }
        }

        setIsLoading(false);
      } catch (e) {
        console.log(e);

        setIsLoading(false);
      }
    };
    getService()
    getFavorites();
    getServiceProviderService();
    // getRecommendedProviders()
  }, [updateFav]);


  // console.log(reviews, "reviews")
  // console.log(favorite, "fav.................");
  const addFavorites = async () => {
    try {
      setUpdateFav(true);
      const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 705,
      };
      const res = await axios.post(
        "https://backend.bitmoservice.com/api/resources/v1/client/add-favorite",
        { partner_id: item.partner_id },
        { headers: header }
      );
      if (res.data.code == 422) {
        alert(res.data.message);
      } else if (res.data.code == 200) {
        alert(res.data.message);
        setUpdateFav(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const removeFromFavorites = async () => {
    try {
      console.log("touched........");
      setUpdateFav(true);
      let favorite;

      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].partner_id == item.partner_id) {
          favorite = favorites[i];
        }
      }

      //console.log(favorite, "favorite.............");
      const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 706,
      };
      const res = await axios.post(
        "https://backend.bitmoservice.com/api/resources/v1/client/remove-favorite",
        { favorite_id: favorite.favorite_id },
        { headers: header }
      );
      if (res.data.code == 422) {
        alert(res.data.message);
      } else if (res.data.code == 200) {
        setUpdateFav(true);
        alert(res.data.message);
      } else {
        console.log(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [orderService, setOrderService] = useState(true);
  const [review, setReview] = useState(false);
  const [social, setSocial] = useState(false);
  const [recent, setRecent] = useState(false);
  // const [social, setSocial] = useState(false);

  const openOrderServices = () => {
    setOrderService(true);
    setReview(false);
    setRecent(false);
    setSocial(false);
  };
  const openReviews = () => {
    setOrderService(false);
    setReview(true);
    setSocial(false);
    setRecent(false);
  };
  const openSocial = () => {
    setOrderService(false);
    setReview(false);
    setSocial(true);
    setRecent(false);
  };
  const openRecent = () => {
    setOrderService(false);
    setReview(false);
    setSocial(false);
    setRecent(true);
  };
  // console.log(favorites);

  // console.log(isFavorite);
  return (
    <>
      <Header navigation={navigation} />

      {
        !showMap && <View stlye={{ flex: 1, backgroundColor: "#fff" }}>
          {loading && (
            <View
              style={{
                flex: 1,
                height: Dimensions.get("screen").height,
                width: Dimensions.get("screen").width,
                backgroundColor: "#08080871",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                elevation: 0.5,
              }}
            >
              <UIActivityIndicator color="#9ad4eb" />
            </View>
          )}
          <ScrollView style={styles.container}>
            <View style={styles.top}>
              <Image
                source={serviceImg}
                style={{ width: Dimensions.get("screen").width, height: 250 }}
              />
              <View style={styles.topBanner}>
                <View style={styles.topBannerLeft}></View>
                <View style={styles.topBannerRight}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="share-social-sharp" size={24} color="#fff" />
                  </View>
                  {isFavorite ? (
                    <Pressable
                      onPress={removeFromFavorites}
                      style={({ pressed }) => [
                        styles.iconContainer,
                        { opacity: pressed ? 0.5 : 1 },
                      ]}
                    >
                      <AntDesign name="heart" size={24} color="#fff" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={addFavorites}
                      style={({ pressed }) => [
                        styles.iconContainer,
                        { opacity: pressed ? 0.5 : 1 },
                      ]}
                    >
                      <AntDesign name="hearto" size={24} color="#fff" />
                    </Pressable>
                  )}
                </View>
              </View>
            </View>

            <View>
              <View
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around"
                  // paddingTop: 10,
                }}
              >
                <Pressable
                  style={[
                    styles.category,
                    orderService && { backgroundColor: "#00709e" },
                    { borderTopLeftRadius: 5 },
                  ]}
                  onPress={openOrderServices}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      orderService && { color: "#fff" },
                    ]}
                  >
                    Service
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.category,
                    review && { backgroundColor: "#00709e" },
                  ]}
                  onPress={openReviews}
                >
                  <Text
                    style={[styles.categoryText, review && { color: "#FFF" }]}
                  >
                    Reviews
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.category,
                    recent && { backgroundColor: "#00709e" },
                  ]}
                  onPress={openRecent}
                >
                  <Text
                    style={[styles.categoryText, recent && { color: "white" }]}
                  >
                    Recent Works
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.category,
                    social && { backgroundColor: "#00709e" },
                    { borderTopRightRadius: 5 },
                  ]}
                  onPress={openSocial}
                >
                  <Text
                    style={[styles.categoryText, social && { color: "white" }]}
                  >
                    Social Media
                  </Text>
                </Pressable>
              </View>
              {isLoading ? (
                <ActivityIndicator color="blue" />
              ) : (
                <View style={{ paddingHorizontal: 10 }}>
                  {
                    orderService && (
                      // services.map((service, i) => (
                      <OrderServices
                        provider={item}
                        navigation={navigation}
                        service={services}
                        data={data}
                        loading={loading}
                        setLoading={setLoading}
                        id={id}
                        setShowMap={setShowMap}
                        setRegion={setRegion}
                        region={region}
                        location={location}
                        relatedProviders={recommendedProviders}
                      />
                    )
                    // ))
                  }
                  {review && <Reviews reviews={reviews} setReviews={setReviews} token={token} />}
                  {social && <SocialAccounts />}
                </View>
              )}
            </View>

            <View style={{ height: 70 }} />
          </ScrollView>
        </View>

      }
      {
        showMap && <ShowMap region={region} setRegion={setRegion} setShowMap={setShowMap} setLocation={setLocation} />
      }
    </>
  );
};

export default ServiceProviderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  top: {
    position: "relative",
  },
  topBanner: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: 10,
  },
  topBannerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  topBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginHorizontal: 5,
    width: 34,
    height: 34,
    borderRadius: 17,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#57515199",
  },
  category: {
    // elevation: 1,
    borderColor: "#0379a8",

    borderWidth: 1.4,
    backgroundColor: "white",
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    minWidth: Dimensions.get("screen").width / 4.5,
    paddingBottom: 5,
    paddingHorizontal: 2.5,
    marginLeft: 1.5,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00709e",
  },
});
