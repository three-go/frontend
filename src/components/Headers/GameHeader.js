import React from "react";

import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ChanceIcons, TextTimer } from "..";
import { iconNames, colors, iconSizes, game } from "../../common";

const GameHeader = ({
  status,
  setStatus,
  onPressBack,
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
  const handleSetStatusDirectionInput = () => {
    setStatus(game.status.directionInput);
  };

  const handleSetStatusPlay = () => {
    setStatus(game.status.play);
  };

  return (
    <View style={styles.container}>
      {status !== game.status.none && (
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
          {status === game.status.open && (
            <TextTimer
              onTimerEnd={handleSetStatusDirectionInput}
              timerInfo={startTimer}
              setTimerInfo={setStartTimer}
            />
          )}

          {status === game.status.directionInput &&
            cameraPermissionStatus === "READY" && (
              <TextTimer
                onTimerEnd={handleSetStatusPlay}
                timerInfo={inputTimer}
                setTimerInfo={setInputTimer}
              />
            )}

          {status === game.status.play && (
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

      {status !== game.status.none && <ChanceIcons chance={chance} />}
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
