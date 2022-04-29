import React, { useState, useEffect, useContext, useMemo } from "react";

import { FaceGo } from "..";
import { game, time, textSizes } from "../../../common";
import { GameContext } from "../../../context";
import { createMap } from "../../../utils";

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

  return (
    <FaceGo
      status={status}
      result={result}
      setResult={setResult}
      setStatus={setStatus}
      score={score}
      setScore={setScore}
      chance={chance}
      setChance={setChance}
      stage={stage}
      gameMap={gameMap}
      currentGameKey={currentGameKey}
      handleNextStage={handleNextStage}
      onRetryCurrentStage={handleRetryStage}
      selectedDirection={selectedDirection}
      setSelectedDirection={setSelectedDirection}
      directions={directions}
      setDirections={setDirections}
      cameraPermissionStatus={cameraPermissionStatus}
      setCameraPermissionStatus={setCameraPermissionStatus}
      onTimerEnd={handleSetStatusOpen}
    />
  );
};

export default FaceGoContainer;
