import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "react-native-splash-screen";

import { GameContextProvider } from "./src/context/GameContext";
import { MainContainer, Game1Container, Game2Container } from "./src/features";

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
            name="Game1"
            component={Game1Container}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Game2"
            component={Game2Container}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </GameContextProvider>
    </NavigationContainer>
  );
};

export default App;
