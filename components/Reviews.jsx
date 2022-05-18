import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import Review from "./Review";
import {
  Foundation
} from "@expo/vector-icons";
import { UIActivityIndicator } from "react-native-indicators";
import axios from "axios";

const Reviews = ({ reviews, setReviews, token }) => {
  // console.log(reviews, "review")
  const [loading, setLoading] = React.useState(false)

  const getService = async (url) => {
    setLoading(true);
    try {
      const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 708,
      };

      const res = await axios.get(
        url,
        { headers: header }
      );

      // setServiceProviders(res.data.data);
      setLoading(false);

      // console.log(res.data.data.reviews, "CATALOGUE")
      setReviews(res.data.data.reviews)
    } catch (e) {
      console.log(e);
      alert("Error");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <UIActivityIndicator color="#9ad4eb" /> :
        <View>
          <Text style={{ color: "#8a8485", fontSize: 22 }}>Reviews</Text>
          <FlatList data={reviews.reviews} renderItem={({ item }) => <Review data={item} />} />
          <View style={{ height: 50 }} />

          <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", width: '100%', paddingHorizontal: 10 }}>
            {!reviews.prev_page_url && <View />}
            {reviews.prev_page_url && <Pressable onPress={() => getService(reviews.prev_page_url)} style={({ pressed }) => [{ opacity: pressed ? .5 : 1, flexDirection: 'row', alignItems: 'center' }]}><Foundation name="previous" size={24} color="#00709e" /><Text style={{ marginLeft: 5, fontSize: 13, fontWeight: '700', color: '#00709e' }}>Prev</Text></Pressable>}
            <Text>{reviews?.page_description}</Text>
            {reviews.next_page_url && <Pressable onPress={() => getService(reviews.next_page_url)} style={({ pressed }) => [{ opacity: pressed ? .5 : 1, flexDirection: 'row', alignItems: 'center' }]}><Text style={{ marginRight: 5, fontSize: 13, fontWeight: '700', color: '#00709e' }}>Next</Text><Foundation name="next" size={24} color="#00709e" /></Pressable>}
            {!reviews.next_page_url && <View />}

          </View>
        </View>
      }
    </>
  );
};

export default Reviews;
