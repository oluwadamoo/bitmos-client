import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const TransactionHistory = ({ transaction, navigation }) => {

  return (
    <Pressable
      onPress={() => navigation?.push("Wallet Details", { transaction: transaction })}
      style={({ pressed }) => [{
        opacity: pressed ? .5 : 1,
        padding: 5,
        paddingHorizontal: 9,
        elevation: 1,
        borderRadius: 2,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }]}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#00709e" }}>
          Amount: NGN {transaction.amount}
        </Text>
        <Text>{transaction.date}</Text>
        <Text
          style={{
            color: transaction?.status == "success" ? "#58d41e" : "#e0c33e",
          }}
        >
          {transaction.status}
        </Text>
      </View>
      <AntDesign name="right" size={15} color="#252525d4" />
    </Pressable>
  );
};

export default TransactionHistory;
