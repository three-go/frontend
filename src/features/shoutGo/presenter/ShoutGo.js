import React from "react";

import PropTypes from "prop-types";
import { StyleSheet, ImageBackground } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { SafeAreaView } from "react-native-safe-area-context";

import { game } from "../../../common/property";
import GameLayout from "../../../components/Layouts/GameLayout";
import InputModalContainer from "../../../components/Modals/InputModalContainer";
import RetryModalContainer from "../../../components/Modals/RetryModalContainer";
import entities from "../entities";
import Physics from "../physics";

const ShoutGo = ({
  currentGameKey,
  status,
  chance,
  score,
  running,
  setGameEngine,
  onRetryGame,
  onGameEvent,
}) => {
  return (
    <GameLayout currentGameKey={currentGameKey} score={score} chance={chance}>
      {status === game.status.collision && (
        <RetryModalContainer onRetryGame={onRetryGame} />
      )}

      {status === game.status.end && <InputModalContainer score={score} />}

      <ImageBackground
        style={styles.background}
        source={require("../../../../public/assets/images/shoutGo/background.png")}
        resizeMode="stretch"
        testID="backgroundImage"
      />

      <SafeAreaView style={styles.container} testID="gameLayout">
        <GameEngine
          ref={(ref) => setGameEngine(ref)}
          systems={[Physics]}
          entities={entities}
          running={running}
          onEvent={onGameEvent}
          style={styles.gameEngine}
        />
      </SafeAreaView>
    </GameLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gameEngine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ShoutGo;

ShoutGo.propTypes = {
  currentGameKey: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  chance: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  decibel: PropTypes.number.isRequired,
  running: PropTypes.bool.isRequired,
  onRetryGame: PropTypes.func.isRequired,
  onGameEvent: PropTypes.func.isRequired,
};
