import React from "react";

import { View, StyleSheet } from "react-native";

import { GameLayout } from "../../../components";

const Game1 = () => {
  return (
    <GameLayout>
      <View style={styles.playArea}>
        <View style={styles.playZone} />
      </View>

      <View style={styles.recordArea}>
        <View style={styles.recordZone} />
      </View>
    </GameLayout>
  );
};

const styles = StyleSheet.create({
  playArea: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
    backgroundColor: "#d8f5a2",
  },
  playZone: {
    width: 300,
    height: 450,
    backgroundColor: "#ffffff",
  },
  recordArea: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
    backgroundColor: "#ffec99",
  },
  recordZone: {
    width: 300,
    height: 80,
    backgroundColor: "#ffffff",
  },
});

export default Game1;
