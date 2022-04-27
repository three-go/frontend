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
  cameraPermissionStatus,
  score,
  currentGameKey,
  progressRate,
  setProgressRate,
  chance,
}) => {
  return (
    <View style={styles.container}>
      {isReady && (
        <Pressable onPress={onPressBack} style={styles.back}>
          <Icon name="arrow-left-thick" size={40} color="#96A1A8" />
        </Pressable>
      )}

      {currentGameKey === "game1" && (
        <View>
          {!isStart && isReady && (
            <TextTimer
              setIsFinish={setIsStart}
              timerInfo={startTimer}
              setTimerInfo={setStartTimer}
            />
          )}

          {!isInput &&
            isStart &&
            isReady &&
            cameraPermissionStatus === "READY" && (
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
        </View>
      )}

      {currentGameKey === "game2" && (
        <View style={styles.scoreWrapper}>
          <Icon name="flag" size={32} color="#96A1A8" />

          <Text style={styles.score}>
            {progressRate.current} / {progressRate.total}
          </Text>
        </View>
      )}

      {isReady && <ChanceIcons chance={chance} />}
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
  scoreWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    marginLeft: 10,
    color: "#FCF8F6",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default GameHeader;
