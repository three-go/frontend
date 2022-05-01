import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "react-native-splash-screen";

import { GameContextProvider } from "./src/context/GameContext";
import { MainContainer, ShoutGoContainer } from "./src/features";
import FaceGoContainer from "./src/features/faceGo/container/FaceGoContainer";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <GameContextProvider>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainContainer}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FaceGo"
            component={FaceGoContainer}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ShoutGo"
            component={ShoutGoContainer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </GameContextProvider>
    </NavigationContainer>
  );
};

export default App;
