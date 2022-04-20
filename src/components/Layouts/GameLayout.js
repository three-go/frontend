import React from "react";

import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameHeader } from "../index";

/*
  [GameLayout 호출 방식 예시]
  <GameLayout>
    <View>게임 보드 내용</View>
  </GameLayout>
*/
const GameLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <GameHeader onPressBack={() => console.log("go back to home!")} />
      </View>
      <View style={styles.gameBoard}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212529",
  },
  header: {
    height: "10%",
  },
  gameBoard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
});

export default GameLayout;
