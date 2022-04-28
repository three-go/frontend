import React from "react";

import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ChanceIcons, TextTimer } from "..";
import { iconNames, colors, iconSizes, game } from "../../common";

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
          <Icon
            name={iconNames.leftArrow}
            size={iconSizes.headerLeftArrow}
            color={colors.gray}
          />
        </Pressable>
      )}

      {currentGameKey === game.keys[0] && (
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

      {currentGameKey === game.keys[1] && (
        <View style={styles.scoreWrapper}>
          <Icon
            name={iconNames.flag}
            size={iconSizes.headerFlag}
            color={colors.gray}
          />

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
    backgroundColor: colors.dark,
    color: colors.ivory,
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
    color: colors.ivory,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default GameHeader;
