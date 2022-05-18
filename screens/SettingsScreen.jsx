import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, Pressable } from "react-native";
import Header from "../components/Header";

const SettingsScreen = ({ navigation }) => {
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(false);

  const toggleEmail = () => {
    setIsEmailEnabled(!isEmailEnabled);
  };
  const toggleSecurity = () => {
    setIsSecurityEnabled(!isSecurityEnabled);
  };
  return (
    <>
      <Header navigation={navigation} home={true} />
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleSwitch}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#f4f3f4"}
                onValueChange={toggleEmail}
                value={isEmailEnabled}
                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
              />
            </View>
            <Text style={styles.toggleTextTitle}>Email Notifications</Text>
          </View>
          <Text style={styles.toggleText}>
            Receive email notifications about activities performed.
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleSwitch}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#f4f3f4"}
                onValueChange={toggleSecurity}
                value={isSecurityEnabled}
                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
              />
            </View>
            <Text style={styles.toggleTextTitle}>Security Notification</Text>
          </View>
          <Text
            style={[styles.toggleText, { borderBottomColor: "transparent" }]}
          >
            Notify me via email when another device log in my account.
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: "#00709e",
              width: 60,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              height: 30,
              alignSelf: "flex-end",
              marginRight: 5,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
              fontWeight: "700",
            }}
          >
            Send
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    padding: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleSwitch: {
    alignItems: "flex-start",
  },
  toggleTextTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#818181",
  },
  toggleText: {
    fontWeight: "500",
    paddingHorizontal: 7,
    borderWidth: 0.7,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#9c9c9c",
    color: "#818181",
  },
});
