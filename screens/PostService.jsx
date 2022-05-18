import axios from "axios";
import React, { useState } from "react";
import { View, Text, Pressable, Dimensions, Platform, Image, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import Header from "../components/Header";
import { UIActivityIndicator } from "react-native-indicators";
import ServiceRequestDetails from "./ServiceRequestDetails";

const PostService = ({ navigation }) => {
  const [serviceRequests, setServiceRequests] = useState([])
  const [openDetails, setOpenDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serviceRequestId, setServiceRequestId] = useState()
  const [serviceDetailDesc, setServiceDetailDesc] = useState({})
  const [canceledServicex, setCancelledService] = useState([])
  const [isCancelling, setIsCancelling] = useState(false)
  const [currentIndex, setCurrentIndex] = useState()
  const user = useSelector((state) => state.user);

  const token = user?.userData.token;

  const header = {
    Authorization: `Bearer ${token}`,
    Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
    App_No: "07fix32665",
    Resource_Code: 733,
  };

  const gotoNext = async (url) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        url,
        { headers: header }
      );
      setServiceRequests(res.data.data);

      setIsLoading(false);
      console.log("=====================")
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  const cancelRequest = async (service_request_id, i) => {
    setCurrentIndex(i)
    setIsCancelling(true);
    let cancelled = canceledServicex
    try {
      const res = await axios.post(
        "https://backend.bitmoservice.com/api/resources/v1/client/cancel-service-request", { service_request_id: service_request_id },
        { headers: { ...header, Resource_Code: 732 } }
      );
      // setServiceRequests(res.data.data);
      console.log(res.data)
      if (res.data.code == 200) {
        cancelled.push(service_request_id)
        setCancelledService(cancelled)
      }
      setIsCancelling(false);
      console.log("=====================")
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  console.log(canceledServicex)
  React.useEffect(() => {

    const fetchServiceRequests = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/service-request-list",
          { headers: header }
        );
        setServiceRequests(res.data.data);

        setIsLoading(false);
        console.log("=====================")
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    fetchServiceRequests();
  }, [canceledServicex]);

  // console.log(serviceRequests, "SERRRRRR")
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {
        openDetails ? <ServiceRequestDetails service_request_id={serviceRequestId} token={token} navigation={navigation} setOpenDetails={setOpenDetails} serviceDetailDesc={serviceDetailDesc} /> :
          <>
            <Header navigation={navigation} home title={"   My Service Request Posts"} />

            {
              isLoading ? <UIActivityIndicator color="#00709e" /> :
                <ScrollView style={{ padding: 10 }}>
                  {serviceRequests?.data &&
                    serviceRequests.data.map((request, i) => (
                      !canceledServicex.includes(request.service_request_id) && <ServiceCard request={request} key={i} setOpenDetails={setOpenDetails} setServiceRequestId={setServiceRequestId} setServiceDetailDesc={setServiceDetailDesc} cancelRequest={cancelRequest} index={i} isCancelling={isCancelling} currentIndex={currentIndex} />
                    ))
                  }
                  <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>

                    {
                      serviceRequests.prev_page_url &&

                      <Pressable onPress={() => gotoNext(serviceRequests.prev_page_url)} style={{ backgroundColor: "#dddddd", width: 110, flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, justifyContent: "space-between", alignItems: 'center' }}><Ionicons name="arrow-back" size={24} color="#00709e" /><Text style={{ color: "#00709e" }}>Prev Page</Text></Pressable>

                    }

                    {
                      serviceRequests.next_page_url &&
                      <View style={{ flexDirection: "row", justifyContent: "space-between", width: serviceRequests.prev_page_url ? 110 : Dimensions.get("screen").width - 20 }}>
                        {!serviceRequests.prev_page_url &&
                          <View style={{ backgroundColor: "red" }} />
                        }
                        <Pressable onPress={() => gotoNext(serviceRequests.next_page_url)} style={{ backgroundColor: "#dddddd", width: 110, flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, justifyContent: "space-between", alignItems: 'center' }}><Text style={{ color: "#00709e" }}>Next Page</Text><Ionicons name="arrow-forward" size={24} color="#00709e" /></Pressable>
                      </View>
                    }

                  </View>
                  <View style={{ height: 50 }} />
                </ScrollView>

            }
          </>
      }

    </View>
  );
};


const ServiceCard = ({ request, setOpenDetails, setServiceRequestId, setServiceDetailDesc, cancelRequest, isCancelling, currentIndex, index }) => {


  const goToDetails = () => {
    setServiceRequestId(request.service_request_id)
    setServiceDetailDesc({ desc: request.description, img: request.img })
    console.log(request.service_request_id, "IDDD")

    setOpenDetails(true)
  }


  return (
    <View style={[styles.card, { opacity: isCancelling && currentIndex == index ? .2 : 1 }]}>

      <Pressable onPress={goToDetails} style={({ pressed }) => [{ flexDirection: "row", opacity: pressed ? .5 : 1, width: Dimensions.get("screen").width - 140 }]}>

        <Image source={{ uri: `https://backend.bitmoservice.com/${request.img}` }} style={styles.cardImg} />
        <View style={styles.cardDescCont}>
          <View>
            <Text style={styles.cardTitle}>{request.service}</Text>
            <Text style={styles.cardDesc}>{request.description}</Text>
            <Text style={{ color: "#acacac", marginTop: 5, fontSize: 13 }}>{request.time}</Text>

          </View>
          <View style={{ alignItems: "center", justifyContent: "center", width: Dimensions.get("screen").width - 150 }}>
            <Text style={{ color: "#00709e" }}>{request.total_servitor} servitors applied</Text>
          </View>
        </View>

      </Pressable>
      <Pressable onPress={() => cancelRequest(request.service_request_id, index)} style={({ pressed }) => [{ opacity: pressed ? .5 : 1 }]}>
        <Ionicons name="close" size={20} color={"#9c9c9c"} />

      </Pressable>

    </View>
  )
}
export default PostService;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderColor: "#cfcfcf",
    borderWidth: 1,
    // elevation: 1,
    marginVertical: 10,
    height: 150,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 15
  },
  cardDescCont: {
    height: 130,
    justifyContent: "space-between"
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16
  },
  cardDesc: {
    marginTop: 10
  }
})