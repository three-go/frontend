import React from "react";

import { View, StyleSheet, SafeAreaView } from "react-native";

import { GameHeader } from "../index";

/*
  [GameLayout 호출 방식 예시]
  <GameLayout>
    <View>게임 보드 내용</View>
  </GameLayout>
*/
const GameLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
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
  },
  header: {
    height: "10%",
  },
  gameBoard: {
    height: "90%",
    backgroundColor: "lightblue",
  },
});

export default GameLayout;
