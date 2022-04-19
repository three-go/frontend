import React from "react";

import { View, StyleSheet } from "react-native";

import { ChanceIcons, SmallButton, TextTimer } from "../index";

/*
  [GameHeader 호출 방식 예시]
  <GameHeader onPressBack={() => console.log("go back to home!")} />
*/
const GameHeader = ({ onPressBack }) => {
  return (
    <View style={styles.container}>
      <SmallButton content="뒤로 가기" color="#525281" onPress={onPressBack} />
      <TextTimer />
      <ChanceIcons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#ffffff",
  },
});

export default GameHeader;
