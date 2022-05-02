import React, { useState, useEffect, useRef, useContext } from "react";

import { StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { SafeAreaView } from "react-native-safe-area-context";
import RNSoundLevel from "react-native-sound-level";

import GameLayout from "../../../components/Layouts/GameLayout";
import InputModalContainer from "../../../components/Modals/InputModalContainer";
import RetryModalContainer from "../../../components/Modals/RetryModalContainer";
import GameContext from "../../../context/GameContext";
import entities from "../entities";
import Physics from "../physics";

const ShoutGoContainer = () => {
  const { currentGameKey } = useContext(GameContext);
  const gameEngine = useRef();

  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [chance, setChance] = useState(3);
  const [decibel, setDecibel] = useState(-160);

  const [status, setStatus] = useState("none");

  useEffect(() => {
    RNSoundLevel.start();
    RNSoundLevel.onNewFrame = (data) => {
      setDecibel(data.value);
    };
    setRunning(true);

    return () => {
      RNSoundLevel.stop();
      setRunning(false);
    };
  }, []);

  useEffect(() => {
    if (gameEngine.current) {
      gameEngine.current.dispatch({
        type: "decibel",
        payload: { volume: decibel },
      });
    }
  }, [decibel]);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setScore((prev) => prev + 1);
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  const decreaseChance = () => {
    if (chance >= 1) {
      setStatus("collision");
      setChance((prev) => prev - 1);
    } else {
      setStatus("end");
    }
  };

  const handleRetryGame = () => {
    gameEngine.current.swap(entities());
    gameEngine.current.start();
    setRunning(true);
    setStatus("none");
  };

  const handleGameEvent = (event) => {
    switch (event.type) {
      case "gameOver":
        if (status === "none") {
          gameEngine.current.stop();
          setRunning(false);
          decreaseChance();
        }
        break;
      case "newPoint":
        setScore((prev) => prev + 1);
        break;
    }
  };

  return (
    <GameLayout currentGameKey={currentGameKey} score={score} chance={chance}>
      {status === "collision" && (
        <RetryModalContainer onRetryGame={handleRetryGame} />
      )}

      {status === "end" && <InputModalContainer score={score} />}

      <SafeAreaView style={styles.container}>
        <GameEngine
          ref={gameEngine}
          systems={[Physics]}
          entities={entities()}
          onEvent={handleGameEvent}
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
  gameEngine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ShoutGoContainer;
