import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./src/Authentication/Onboarding";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const AuthenticationStack = createNativeStackNavigator();

const AuthenticationNavigator = () => {
  let [fontsLoaded] = useFonts({
    bold: require("./assets/fonts/SF-Pro-Text-Bold.otf"),
    semiBold: require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
    regular: require("./assets/fonts/SF-Pro-Text-Regular.otf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
    </AuthenticationStack.Navigator>
  );
};

export default function App() {
  return (
      <NavigationContainer>
        <AuthenticationNavigator />
      </NavigationContainer>
  );
}
