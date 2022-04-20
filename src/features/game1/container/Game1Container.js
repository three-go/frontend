import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { GameLayout } from "../../../components";

const Game1Container = () => {
  return (
    <GameLayout>
      <View style={styles.playArea}>
        <Text>맵 영역</Text>
      </View>

      <View style={styles.recordArea}>
        <Text>방향 기록 영역</Text>
      </View>
    </GameLayout>
  );
};

const styles = StyleSheet.create({
  playArea: {
    width: "100%",
    height: "80%",
    backgroundColor: "#d8f5a2",
  },
  recordArea: {
    width: "100%",
    height: "20%",
    backgroundColor: "#ffec99",
  },
});

export default Game1Container;
