import React, { useState, useEffect, useContext, useMemo } from "react";

import { Game1 } from "..";
import { time, textSizes } from "../../../common";
import { GameContext } from "../../../context";
import { createMap } from "../../../utils";

const Game1Container = () => {
  const { currentGameKey } = useContext(GameContext);

  const [isReady, setIsReady] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isInput, setIsInput] = useState(false);

  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [score, setScore] = useState(500);
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState("");

  const [readyTimer, setReadyTimer] = useState({
    text: "게임시작",
    count: time.readyTimerSet,
    size: textSizes.medium,
  });

  const [startTimer, setStartTimer] = useState({
    text: "맵이 가려지기",
    count: time.startTimerSet,
    size: textSizes.samll,
  });

  const [inputTimer, setInputTimer] = useState({
    text: "입력이 종료되기",
    count: time.inputTimerSet,
    size: textSizes.samll,
  });

  const [selectedDirection, setSelectedDirection] = useState({});
  const [directions, setDirections] = useState([]);

  const [stage, setStage] = useState(1);
  const [chance, setChance] = useState(3);

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

    setIsReady(false);
    setIsStart(false);
    setIsInput(false);
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

  useEffect(() => {
    if (!selectedDirection?.direction) {
      return;
    }

    setDirections((prevState) => [...prevState, selectedDirection]);
  }, [selectedDirection]);

  useEffect(() => {
    let timeoutId;

    if (isInput && isStart && isReady) {
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
  }, [isInput, directions.length]);

  return (
    <Game1
      isReady={isReady}
      setIsReady={setIsReady}
      isStart={isStart}
      setIsStart={setIsStart}
      isInput={isInput}
      setIsInput={setIsInput}
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
    />
  );
};

export default Game1Container;
