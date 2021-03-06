import React, { useState, useEffect, useContext, useMemo } from "react";

import { time } from "../../../common/constants";
import { game } from "../../../common/property";
import GameContext from "../../../context/GameContext";
import { createMap } from "../../../utils/map";
import FaceGo from "../presenter/FaceGo";

const FaceGoContainer = () => {
  const { currentGameKey } = useContext(GameContext);

  const [status, setStatus] = useState(game.status.none);
  const [result, setResult] = useState(game.result.none);

  const [cameraPermissionStatus, setCameraPermissionStatus] = useState("");
  const [selectedDirection, setSelectedDirection] = useState({});
  const [directions, setDirections] = useState([]);

  const [score, setScore] = useState(500);
  const [stage, setStage] = useState(1);
  const [chance, setChance] = useState(3);

  const gameMap = useMemo(() => {
    return createMap(stage);
  }, [stage]);

  const handleReset = () => {
    setStatus("none");
    setSelectedDirection((prev) => {});
  };

  const handleNextStage = () => {
    setStage((prev) => prev + 1);
    setResult(game.result.none);
    handleReset();
  };

  const handleRetryStage = () => {
    setResult(game.result.none);
    handleReset();
  };

  const handleSetStatusOpen = () => {
    setStatus(game.status.open);
  };

  useEffect(() => {
    if (!selectedDirection?.direction) {
      return;
    }

    setDirections((prevState) => [...prevState, selectedDirection]);
  }, [selectedDirection]);

  useEffect(() => {
    let timeoutId;

    if (status === game.status.play) {
      if (directions.length < 1) {
        return;
      }

      timeoutId = setTimeout(() => {
        const copy = directions.slice();
        copy.shift();
        setDirections(copy);
      }, time.playInterval);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [status, directions.length]);

  useEffect(() => {
    if (status !== game.status.play) {
      game.sounds.timer.setNumberOfLoops(-1);
      game.sounds.timer.play();
    }

    return () => {
      if (status !== game.status.play) {
        game.sounds.timeout.play();
        game.sounds.timer.stop();
      }
    };
  }, [status]);

  return (
    <FaceGo
      gameInfo={{
        stage,
        status,
        setStatus,
        result,
        setResult,
        currentGameKey,
        gameMap,
        handleNextStage,
        handleRetryStage,
        handleSetStatusOpen,
      }}
      userInfo={{
        score,
        setScore,
        chance,
        setChance,
        directions,
        setDirections,
      }}
      cameraInfo={{
        selectedDirection,
        setSelectedDirection,
        cameraPermissionStatus,
        setCameraPermissionStatus,
      }}
    />
  );
};

export default FaceGoContainer;
