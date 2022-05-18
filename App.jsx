import { Provider } from "react-redux";
import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import store from "./redux/store";

import * as Font from "expo-font";
import RootNavigator from "./Navigation/Stack/RootNavigation";
import TermsAndPolicy from "./screens/TermsAndPolicy";
export default function App() {
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          // "fira-bold": require("./assets/fonts/FiraCode-Bold.ttf"),
          // "fira-light": require("./assets/fonts/FiraCode-Light.ttf"),
          // "fira-medium": require("./assets/fonts/FiraCode-Medium.ttf"),
          // "fira-regular": require("./assets/fonts/FiraCode-Regular.ttf"),
          // "fira-semibold": require("./assets/fonts/FiraCode-SemiBold.ttf"),
        });
      } catch (e) {
        // console.warn(e);
        console.log("unable to load font");
      }
    }
    loadResourcesAndDataAsync();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
