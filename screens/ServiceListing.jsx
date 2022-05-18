import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import { UIActivityIndicator } from "react-native-indicators";

export default function ServiceListing({ navigation, route }) {
  console.log(navigation.canGoBack(), "Navigation...")
  const [services, setServices] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const item = route.params.item;
  const id = route.params.id
  console.log(id, "itemzzzzz");

  const user = useSelector((state) => state.user);

  const token = user?.userData.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: 703,
  };

  React.useEffect(() => {
    const fetchServiceCatalogue = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(
          `https://backend.bitmoservice.com/api/resources/v1/client/service-catalogue/${item.sub_category_id}/${item.partner_id}`,
          { headers }
        );

        // console.log(res.data.data.service);
        //   console.log("==============================================");

        if (res.data.code == 200) {
          setServices(res.data.data.service);
          setIsLoading(false)
          console.log(res.data.data)
        }
        setIsLoading(false)
        console.log(services, "services");
      } catch (e) {
        console.log(e);
        setIsLoading(false)
      }
    };
    fetchServiceCatalogue();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={item.partner_name} isListing />


      {isLoading ? (
        <View
          style={{
            flex: 1,
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            alignItems: "center",
            justifyContent: "center",
            elevation: 0.5,
          }}
        >
          <UIActivityIndicator color="#00709e" />
        </View>) :
        <View style={styles.wrapper}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Service listings</Text>
          </View>

          <ScrollView
            style={styles.listings}
            showsVerticalScrollIndicator={false}
          >
            {services.map((service, i) => (
              <Pressable
                key={i}
                onPress={() =>
                  navigation.push("Request for Service", {
                    item: item,
                    service: service,
                    id: id,
                    partner_id: item.partner_id
                  })
                }
                style={({ pressed }) => [
                  styles.listing,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
              >
                <Text style={styles.title}>{service.title}</Text>
                <Text style={styles.price}>NGN {service.price}</Text>
              </Pressable>
            ))}

            <View style={{ height: 100 }} />
          </ScrollView>
        </View>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  wrapper: {
    padding: 10,
  },
  headingContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "800",
    fontSize: 20,
  },
  listings: {},
  listing: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomColor: "#9e9e9e",
    borderBottomWidth: 0.3,
    borderTopColor: "#9e9e9e",
    borderTopWidth: 0.3,
    alignItems: "center",
  },
  title: {
    width: Dimensions.get("screen").width / 2,
    fontSize: 15,
  },
  price: {
    color: "#00709e",
    fontWeight: "700",
  },
});
