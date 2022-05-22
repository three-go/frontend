import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "react-native-splash-screen";

import { GameContextProvider } from "./src/context/GameContext";
import FaceGoContainer from "./src/features/faceGo/container/FaceGoContainer";
import MainContainer from "./src/features/main/container/MainContainer";
import ShoutGoContainer from "./src/features/shoutGo/container/ShoutGoContainer";
import TimmerContainer from "./src/features/shoutGo/container/TimerContainer";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    if (SplashScreen.hide) {
      SplashScreen.hide();
    }
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

          <Stack.Screen
            name="Timer"
            component={TimmerContainer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </GameContextProvider>
    </NavigationContainer>
  );
};

export default App;
