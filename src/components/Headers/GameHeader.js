import React from "react";

import PropTypes from "prop-types";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { iconNames, camera, colors, iconSizes } from "../../common/constants";
import { game } from "../../common/property";
import ChanceIcons from "../ChanceIcons";
import TextTimer from "../Timers/TextTimer";

const GameHeader = ({
  status,
  setStatus,
  onPressBack,
  chance,
  score,
  cameraPermissionStatus,
  currentGameKey,
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
              status={status}
            />
          )}

          {status === game.status.directionInput &&
            cameraPermissionStatus === camera.permissionReady && (
              <TextTimer onTimerEnd={handleSetStatusPlay} status={status} />
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
          <Text style={styles.score}>
            SCORE{"\n"}
            {score}
          </Text>
        </View>
      )}

      {(status !== game.status.none || currentGameKey === game.keys[1]) && (
        <ChanceIcons chance={chance} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: colors.dark,
    color: colors.ivory,
  },
  back: {
    width: 65,
    height: 40,
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
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default React.memo(GameHeader);

GameHeader.propTypes = {
  status: PropTypes.string,
  setStatus: PropTypes.func,
  onPressBack: PropTypes.func.isRequired,
  chance: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  cameraPermissionStatus: PropTypes.string,
  currentGameKey: PropTypes.string.isRequired,
};
