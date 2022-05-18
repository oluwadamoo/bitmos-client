import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletScreen from "../../screens/WalletScreen";
import SendWallet from "../../components/SendWallet";
import TransactionDetails from "../../screens/TransactionDetails";
import TransactionHistory from "../../components/TransactionHistory";

const Stack = createNativeStackNavigator();

export default function WalletNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Send Wallet"
        component={SendWallet}
        options={({ route }) => ({
          headerShown: false,
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="Wallet Details"
        component={TransactionDetails}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}
