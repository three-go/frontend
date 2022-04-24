import React, { useState, useEffect, useContext, useMemo } from "react";

import { Game1 } from "..";
import { GameContext } from "../../../context";
import { createMap } from "../../../utils";

const Game1Container = () => {
  const { currentGameKey } = useContext(GameContext);

  const [isReady, setIsReady] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [score, setScore] = useState(500);
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState("");

  const [readyTimer, setReadyTimer] = useState({
    text: "게임시작",
    count: 3,
    size: 30,
  });

  const [startTimer, setStartTimer] = useState({
    text: "맵이 가려지기",
    count: 10,
    size: 15,
  });

  const [inputTimer, setInputTimer] = useState({
    text: "입력이 종료되기",
    count: 15,
    size: 15,
  });

  const [selectedDirection, setSelectedDirection] = useState({});
  const [directions, setDirections] = useState([]);

  const [stage, setStage] = useState(1);

  const gameMap = useMemo(() => {
    return createMap(stage);
  }, [stage]);

  const handleNextStage = () => {
    setStage((prev) => prev + 1);

    setIsReady(false);
    setIsStart(false);
    setIsInput(false);
    setIsWin(false);

    setReadyTimer((prev) => {
      return {
        ...prev,
        count: 3,
      };
    });

    setStartTimer((prev) => {
      return {
        ...prev,
        count: 10,
      };
    });

    setInputTimer((prev) => {
      return {
        ...prev,
        count: 15,
      };
    });

    setSelectedDirection((prev) => {});
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
      }, 1000);
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
      score={score}
      setScore={setScore}
      isEnd={isEnd}
      setIsEnd={setIsEnd}
      stage={stage}
      selectedDirection={selectedDirection}
      setSelectedDirection={setSelectedDirection}
      directions={directions}
      setDirections={setDirections}
      cameraPermissionStatus={cameraPermissionStatus}
      setCameraPermissionStatus={setCameraPermissionStatus}
      gameMap={gameMap}
      currentGameKey={currentGameKey}
      handleNextStage={handleNextStage}
    />
  );
};

export default Game1Container;
