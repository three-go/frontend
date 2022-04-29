import React, { useState, useEffect, useContext, useMemo } from "react";

import { Game1 } from "..";
import { game, time, textSizes } from "../../../common";
import { GameContext } from "../../../context";
import { createMap } from "../../../utils";

const Game1Container = () => {
  const { currentGameKey } = useContext(GameContext);

  const [status, setStatus] = useState("none");
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [cameraPermissionStatus, setCameraPermissionStatus] = useState("");
  const [selectedDirection, setSelectedDirection] = useState({});
  const [directions, setDirections] = useState([]);

  const [score, setScore] = useState(500);
  const [stage, setStage] = useState(1);
  const [chance, setChance] = useState(3);

  const [readyTimer, setReadyTimer] = useState({
    text: "게임시작",
    count: time.readyTimerSet,
    size: textSizes.medium,
  });

  const [startTimer, setStartTimer] = useState({
    text: "맵이 가려지기",
    count: time.startTimerSet,
    size: textSizes.small,
  });

  const [inputTimer, setInputTimer] = useState({
    text: "입력이 종료되기",
    count: time.inputTimerSet,
    size: textSizes.small,
  });

  const gameMap = useMemo(() => {
    return createMap(stage);
  }, [stage]);

  const handleReset = () => {
    setReadyTimer((prev) => {
      return {
        ...prev,
        count: time.readyTimerSet,
      };
    });

    setStartTimer((prev) => {
      return {
        ...prev,
        count: time.startTimerSet,
      };
    });

    setInputTimer((prev) => {
      return {
        ...prev,
        count: time.inputTimerSet,
      };
    });

    setStatus("none");
    setSelectedDirection((prev) => {});
  };

  const handleNextStage = () => {
    setStage((prev) => prev + 1);
    setIsWin(false);
    handleReset();
  };

  const handleRetryStage = () => {
    setIsLose(false);
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
    <Game1
      status={status}
      setStatus={setStatus}
      readyTimer={readyTimer}
      setReadyTimer={setReadyTimer}
      startTimer={startTimer}
      setStartTimer={setStartTimer}
      inputTimer={inputTimer}
      setInputTimer={setInputTimer}
      isWin={isWin}
      setIsWin={setIsWin}
      isLose={isLose}
      setIsLose={setIsLose}
      isEnd={isEnd}
      setIsEnd={setIsEnd}
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

export default Game1Container;
