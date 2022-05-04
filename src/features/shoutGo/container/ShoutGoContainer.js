import React, { useState, useEffect, useContext } from "react";

import RNSoundLevel from "react-native-sound-level";

import { game } from "../../../common/property";
import GameContext from "../../../context/GameContext";
import { createEntities } from "../entities";
import ShoutGo from "../presenter/ShoutGo";

const ShoutGoContainer = () => {
  const { currentGameKey } = useContext(GameContext);

  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [chance, setChance] = useState(3);
  const [decibel, setDecibel] = useState(-160);
  const [status, setStatus] = useState(game.status.none);
  const [gameEngine, setGameEngine] = useState(null);

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
    if (gameEngine !== null && decibel !== -160) {
      gameEngine.dispatch({
        type: game.event.decibel,
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
      setChance((prev) => prev - 1);
      setStatus(game.status.collision);
    } else {
      setStatus(game.status.end);
    }
  };

  const handleRetryGame = () => {
    gameEngine.swap(createEntities());
    setRunning(true);
    setStatus(game.status.none);
  };

  const handleGameEvent = (event) => {
    switch (event.type) {
      case game.event.gameOver:
        if (status === game.status.none) {
          setRunning(false);
          decreaseChance();
        }
        break;
    }
  };

  return (
    <ShoutGo
      currentGameKey={currentGameKey}
      status={status}
      chance={chance}
      score={score}
      decibel={decibel}
      running={running}
      setGameEngine={setGameEngine}
      onRetryGame={handleRetryGame}
      onGameEvent={handleGameEvent}
    />
  );
};

export default ShoutGoContainer;
