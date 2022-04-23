import React from "react";

import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ChanceIcons, TextTimer } from "../index";

const GameHeader = ({
  onPressBack,
  isReady,
  isStart,
  setIsStart,
  isInput,
  setIsInput,
  startTimer,
  setStartTimer,
  inputTimer,
  setInputTimer,
  score,
}) => {
  return (
    <View>
      {isReady && (
        <View style={styles.container}>
          <Pressable onPress={onPressBack} style={styles.back}>
            <Icon name="arrow-left-thick" size={40} color="#96A1A8" />
          </Pressable>

          {!isStart && isReady && (
            <TextTimer
              setIsFinish={setIsStart}
              timerInfo={startTimer}
              setTimerInfo={setStartTimer}
            />
          )}

          {!isInput && isStart && isReady && (
            <TextTimer
              setIsFinish={setIsInput}
              timerInfo={inputTimer}
              setTimerInfo={setInputTimer}
            />
          )}

          {isInput && isStart && isReady && (
            <Text style={styles.score}>
              SCORE{"\n"}
              {score}
            </Text>
          )}

          <ChanceIcons />
        </View>
      )}
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
    backgroundColor: "#212529",
    color: "#FCF8F6",
  },
  back: {
    justifyContent: "center",
    width: 80,
    height: 40,
    paddingLeft: 18,
  },
  score: {
    color: "#FCF8F6",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GameHeader;
