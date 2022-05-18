import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import MapInput, { MapInputVariants } from 'react-native-map-input';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from '@expo/vector-icons';

export default function ShowMap({ region, setRegion, setShowMap, setLocation, isPartner }) {



    console.log(region, "REGION")
    return (

        <View style={{ marginTop: 0, flex: 1 }}>
            <Pressable onPress={() => setShowMap(false)} style={({ pressed }) => [{ alignSelf: "flex-end", flexDirection: 'row', opacity: pressed ? .5 : 1, backgroundColor: "#d6d6d6", height: 30, width: 80, borderRadius: 16, zIndex: 3, position: "absolute", alignItems: "center", justifyContent: "center" }]}>
                <Ionicons name="close" size={20} color="#00709e" />
                <Text style={{ color: "#00709e" }}> Close</Text>
            </Pressable>
            <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true


                    if (!isPartner) {
                        setLocation(`${data.structured_formatting.main_text}, ${data.structured_formatting.secondary_text}`)
                        setRegion({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.922,
                            longitudeDelta: 0.421
                        })

                    }

                }}
                query={{
                    key: "AIzaSyBwGOkGlcjMgpaDox4TdWbTCloI82Qhg7k",
                    language: "en",
                    // components: "country:ng",
                    // types: "establishment",
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: { flex: 0, top: 35, position: "absolute", width: "100%", zIndex: 1 },
                    listView: { backgroundColor: "white" }
                }}
            />
            <MapInput
                style={styles.map}
                region={region}
                onChange={setRegion}
                variant={MapInputVariants.BY_MARKER}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    map: {
        // flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})