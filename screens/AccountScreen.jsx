import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Header from "../components/Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const avatar = require("../assets/images/avatars/male_avatar.png");
export default function AccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // console.log(user, "USERS")
  const [gender, setGender] = useState(user?.userData?.user?.gender);
  const [genderLoading, setGenderLoading] = useState(false)
  const [maritalLoading, setMaritalLoading] = useState(false)
  const [maritalStatus, setMaritalStatus] = useState(user?.userData?.user?.marital_status);
  const [editName, setEditName] = useState(false);
  const [firstNameLoading, setFirstNameLoading] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [lastNameLoading, setLastNameLoading] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const [editPhone, setEditPhone] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [phone_number, setPhoneNumber] = useState(
    user?.userData.user.phone_number
  );
  const [client_name, setClientName] = useState(user?.userData?.user?.first_name);
  const [client_last_name, setClientLastName] = useState(
    user?.userData.user.last_name
  );
  const [client_email, setClientEmail] = useState(user?.userData.user.email);
  const [client_address, setClientAddress] = useState(
    user?.userData.user.address
  );

  const [client_pix, setClientPix] = useState(user?.userData.user.profile_photo);
  const [pixLoading, setPixLoading] = useState(false);

  const token = user?.userData.token;

  const [userUpdate, setUserUpdate] = useState(false);

  const editMarital = (value) => {
    console.log('touched....', maritalStatus)
    setMaritalStatus(value);
    editProfile("marital");
  };

  const editGender = (value) => {
    console.log('touched....', gender)

    setGender(value);
    // console.log("touched...");
    editProfile("gender");
  };
  const editProfile = async (field) => {
    try {
      const header = {
        Authorization: `Bearer ${token}`,
        Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
        App_No: "07fix32665",
        Resource_Code: 308,
      };
      switch (field) {
        case "name":
          if (client_name.length > 2) {
            setFirstNameLoading(true);
            const res = await axios.post(
              "https://backend.bitmoservice.com/api/resources/v1/client/update-profile",
              { client_first_name: client_name },
              { headers: header }
            );
            if (res.data.code == 200) {
              Alert.alert(
                "Success!",
                "Your first name has been updated successfully!"
              );
            }
            console.log(res.data);
            setFirstNameLoading(false);
          } else {
            alert("Field cannot be empty!");
          }
          break;
        case "last_name":
          if (client_last_name.length > 2) {
            setLastNameLoading(true);
            const response = await axios.post(
              "https://backend.bitmoservice.com/api/resources/v1/client/update-profile",
              { client_last_name: client_last_name },
              { headers: header }
            );
            console.log(response.data);
            if (response.data.code == 200) {
              Alert.alert(
                "Success!",
                "Your last name has been updated successfully!"
              );
            } else {
              Alert.alert("Error!", response.data.message);
            }
            setLastNameLoading(false);
          } else {
            Alert.alert("Field cannot be empty", "Last name cannot be empty");
          }
          break;
        case "address":
          if (client_address.length > 1) {
            setAddressLoading(true);
            console.log(client_address);
            const result = await axios.post(
              "https://backend.bitmoservice.com/api/resources/v1/client/update-profile",
              { client_address: client_address },
              { headers: header }
            );
            console.log(result.data);
            if (result.data.code == 200) {
              Alert.alert(
                "Success!",
                "Your address has been updated successfully!"
              );
            } else {
              Alert.alert("Error!", result.data.message);
            }
            setAddressLoading(false);
          } else {
            Alert.alert("Field cannot be empty", "Address cannot be empty");
          }
          break;
        case "phone":
          if (phone_number.length > 1) {
            setPhoneLoading(true);
            const resp = await axios.post(
              "https://backend.bitmoservice.com/api/resources/v1/client/update-profile",
              { client_phone_number: phone_number },
              { headers: header }
            );
            if (resp.data.code == 200) {
              Alert.alert(
                "Success!",
                "Your phone number has been updated successfully!"
              );
            } else {
              Alert.alert("Error!", resp.data.message);
            }
            setPhoneLoading(false);
          } else {
            Alert.alert(
              "Field cannot be empty",
              "phone number cannot be empty"
            );
          }
          console.log(resp);
          break;

        case "marital":
          const maritalresp = await axios.post(
            "https://backend.bitmoservice.com/api/resources/v1/client/update-profile",
            { client_marital_status: maritalStatus },
            { headers: header }
          );
          if (maritalresp.data.code == 200) {
            Alert.alert(
              "Success!",
              "Your status has been updated successfully!"
            );
          } else {
            Alert.alert("Error!", maritalresp.data.message);
          }

          console.log(maritalresp);
          break;

        case "gender":
          console.log("touched.............");
          const genderresp = await axios.post(
            "https://backend.bitmoservice.com/api/resources/v1/client/update-profile",
            { client_gender: gender },
            { headers: header }
          );
          if (genderresp.data.code == 200) {
            Alert.alert(
              "Success!",
              "Your gender has been updated successfully!"
            );
          } else {
            Alert.alert("Error!", genderresp.data.message);
          }

          console.log(genderresp);
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const getUserDetails = async () => {
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
          App_No: "07fix32665",
          Resource_Code: 311,
        };
        const res = await axios.get(
          "https://backend.bitmoservice.com/api/resources/v1/client/profile-info",
          { headers: header }
        );

        console.log(res.data.data, "user data from profile");
        const user_data = {
          token: token,
          user: res.data.data,
        };

        // console.log(res.data.data);
        try {
          await AsyncStorage.setItem("@save_user", JSON.stringify(user_data));
          dispatch(loginSuccess(user_data));
        } catch (e) {
          alert("Failed to save user data");
          console.log(e);
        }

        // dispatch(loginSuccess(JSON.parse(user)));
        // console.log(
        //   userData.userData.user,
        //   "user data.userdata..........From Bottom Navigator..."
        // );
      } catch (e) {
        console.log(e);
      }
    };
    getUserDetails();
  }, [userUpdate]);

  const updatePic = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
        base64: true
      });

      if (!result.cancelled) {
        setPixLoading(false);

        setClientPix(result.uri);
        let asst = result.uri
        let assetArr = asst.split('.')
        let base64 = result.base64
        let type = assetArr[assetArr.length - 1]
        const file = `data:${type};base64,${base64}`
        const data = new FormData()

        data.append("file", file)
        data.append("upload_preset", "client_profile_pictures")
        data.append("cloud_name", 'bytmos-com')
        data.append("api_key", '357315174541667')
        data.append("api_secret", 'Zo7METDQSWGFXXfLGOjA5rjzbyE')

        fetch(`https://api.cloudinary.com/v1_1/bytmos-com/image/upload`, {

          method: "POST",
          body: data
        })
          .then(res => res.json())
          .then(data => {
            console.log(data, "IMGE DATA.........");
            uploadPix(data.secure_url)
          })
          .catch(err => {
            console.log(err)

          })

        setPixLoading(false);


      }
    } catch (e) {
      console.log(e);
      alert(e);
      setPixLoading(false);
    }
  };

  const uploadPix = async (profile_photo) => {
    console.log(profile_photo, "profile photo")
    const header = {
      Authorization: `Bearer ${token}`,
      Client_Secret: "Ku0DjUFHdGUUbvEkHqv975WLPQv5DJYpK6k",
      App_No: "07fix32665",
      Resource_Code: 307,
    };
    try {
      const res = await axios.post(
        "https://backend.bitmoservice.com/api/resources/v1/client/update-profile-photo",
        { profile_photo: profile_photo },
        { headers: header }
      );
      console.log(res.data);

      if (res.data.code == 200) {
        alert(res.data.message);
      } else if (res.data.code == 401) {
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e)
      alert(e.toString())
    }
  }
  return (
    <>
      <Header navigation={navigation} home={true} />
      <ScrollView
        style={{
          padding: 15,
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        {user?.userData.user.profile_photo == null}
        <Pressable
          onPress={updatePic}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              flexDirection: "row",
              position: "relative",
            },
          ]}
        >
          <Image
            source={
              client_pix == null
                ? avatar
                : {
                  uri: client_pix,
                }
            }
            style={{ height: 100, width: 100, borderRadius: 50 }}
          />
          {pixLoading && (
            <ActivityIndicator
              color="blue"
              style={{ position: "absolute", top: 50 }}
            />
          )}
        </Pressable>

        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 25,
              marginBottom: 8,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                {user?.userData.user.first_name}
              </Text>
              <Text

              >
                Names
              </Text>
            </View>
            {firstNameLoading == true ? (
              <ActivityIndicator color="blue" />
            ) : (
              <MaterialCommunityIcons
                name="pencil-outline"
                size={24}
                color="#00709e"
                onPress={() => setEditName(!editName)}
              />
            )}
          </View>
          <View
            style={{
              backgroundColor: "black",
              height: 0.5,
              alignSelf: "center",
              width: Dimensions.get("screen").width,
            }}
          />
          {editName && (
            <View style={{ position: "relative" }}>
              <TextInput
                placeholder="Full Names"
                value={client_name}
                style={[styles.input, { fontWeight: "500" }]}
                returnKeyType="send"
                onChangeText={setClientName}
                onEndEditing={() => editProfile("name")}
              />
            </View>
          )}
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 25,
              marginBottom: 8,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                {user?.userData.user.last_name}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                }}
              >
                Last name
              </Text>
            </View>
            {lastNameLoading == true ? (
              <ActivityIndicator color="blue" />
            ) : (
              <MaterialCommunityIcons
                name="pencil-outline"
                size={24}
                color="#00709e"
                onPress={() => setEditLastName(!editLastName)}
              />
            )}
          </View>
          <View
            style={{
              backgroundColor: "black",
              height: 0.5,
              alignSelf: "center",
              width: Dimensions.get("screen").width,
            }}
          />
          {editLastName && (
            <View>
              <TextInput
                placeholder="Last name..."
                value={client_last_name}
                style={[styles.input, { fontWeight: "500" }]}
                returnKeyType="send"
                onChangeText={setClientLastName}
                onEndEditing={() => editProfile("last_name")}
              />
            </View>
          )}
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 25,
              marginBottom: 8,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                {user?.userData.user.email}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                }}
              >
                Email Address
              </Text>
            </View>

            <MaterialCommunityIcons
              name="pencil-outline"
              size={24}
              color="#00709e"
              onPress={() => setEditEmail(!editEmail)}
            />
          </View>
          <View
            style={{
              backgroundColor: "black",
              height: 0.5,
              alignSelf: "center",
              width: Dimensions.get("screen").width,
            }}
          />
          {editEmail && (
            <View>
              <TextInput
                placeholder="Email Address"
                value={client_email}
                style={[styles.input, { fontWeight: "500" }]}
                returnKeyType="send"
                onEndEditing={() => editProfile("email")}
              />
            </View>
          )}
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 25,
              marginBottom: 8,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  fontWeight: "500",
                }}
              >
                {user?.userData.user.phone_number}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                }}
              >
                Phone Number
              </Text>
            </View>
            {phoneLoading == true ? (
              <ActivityIndicator color="blue" />
            ) : (
              <MaterialCommunityIcons
                name="pencil-outline"
                size={24}
                color="#00709e"
                onPress={() => setEditPhone(!editPhone)}
              />
            )}
          </View>
          <View
            style={{
              backgroundColor: "black",
              height: 0.5,
              alignSelf: "center",
              width: Dimensions.get("screen").width,
            }}
          />
          {editPhone && (
            <View>
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                value={phone_number}
                onChangeText={setPhoneNumber}
                style={[styles.input, { fontWeight: "500" }]}
                returnKeyType="send"
                onEndEditing={() => editProfile("phone")}
              />
            </View>
          )}
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 25,
              marginBottom: 8,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  fontWeight: "500",
                }}
              >
                {client_address ? client_address : user?.userData.user.address}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                }}
              >
                Address
              </Text>
            </View>
            {addressLoading == true ? (
              <ActivityIndicator color="blue" />
            ) : (
              <MaterialCommunityIcons
                name="pencil-outline"
                size={24}
                color="#00709e"
                onPress={() => setEditAddress(!editAddress)}
              />
            )}
          </View>
          <View
            style={{
              backgroundColor: "black",
              height: 0.5,
              alignSelf: "center",
              width: Dimensions.get("screen").width,
            }}
          />
          {editAddress && (
            <View style={{ marginBottom: 10 }}>
              <TextInput
                placeholder="Address"
                value={client_address}
                onChangeText={setClientAddress}
                style={[styles.input, { fontWeight: "500" }]}
                returnKeyType="send"
                onEndEditing={() => editProfile("address")}
              />
            </View>
          )}
        </View>

        <View>
          <View
            style={{
              backgroundColor: "black",
              height: 0.5,
              alignSelf: "center",
              width: Dimensions.get("screen").width,

            }}
          />
          <View
            style={{
              marginVertical: 10,
              borderWidth: 1,
              borderColor: "#6b6969",
              backgroundColor: "#fff",
              height: 40,
              // alignItems: "center",
              justifyContent: "center",
              borderRadius: 6
            }}
          >
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) => editGender(itemValue)}
              onTouchEnd={() => editProfile("gender")}
            >
              <Picker.Item
                label={gender ? gender.toUpperCase() : "Choose Gender"}
                value={gender && gender}
                enabled={false}
              />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>

        <View>
          <View
            style={{
              backgroundColor: "black",
              height: 0.5,
              alignSelf: "center",
              width: Dimensions.get("screen").width,
            }}
          />
          <View
            style={{
              marginVertical: 10,
              borderWidth: 1,
              borderColor: "#6b6969",
              backgroundColor: "#fff",
              height: 40,
              borderRadius: 6,
              // alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Picker
              selectedValue={maritalStatus}
              onValueChange={(itemValue, itemIndex) => editMarital(itemValue)}
              onTouchEnd={() => editProfile("marital")}
            >
              <Picker.Item
                label={
                  maritalStatus
                    ? maritalStatus.toUpperCase()
                    : "Select Marital Status"
                }
                value={maritalStatus && maritalStatus}
                enabled={false}
              />
              <Picker.Item label="Single" value="single" />
              <Picker.Item label="Married" value="married" />
              <Picker.Item label="Others" value="others" />
            </Picker>
          </View>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    height: 35,
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 15,
    padding: 10,
    borderRadius: 10,
    borderColor: "#365f61",
    paddingTop: 5,
  },
});
