import React, { useState, useEffect, useContext, useMemo } from "react";

import { Game1 } from "..";
import { GameContext } from "../../../context";
// import { createMap } from "../../../utils";

const Game1Container = () => {
  const { currentGameKey } = useContext(GameContext);

  const [isReady, setIsReady] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [score, setScore] = useState(500);

  const [readyTimer, setReadyTimer] = useState({
    text: "게임시작",
    count: 3,
    size: 30,
  });

  const [startTimer, setStartTimer] = useState({
    text: "맵이 가려지기",
    count: 2,
    size: 15,
  });

  const [inputTimer, setInputTimer] = useState({
    text: "입력이 종료되기",
    count: 2,
    size: 15,
  });

  const [selectedDirection, setSelectedDirection] = useState({});
  const [directions, setDirections] = useState([
    { direction: "down" },
    { direction: "down" },
    { direction: "down" },
    { direction: "down" },
    { direction: "down" },
    { direction: "right" },
    { direction: "right" },
    { direction: "right" },
    { direction: "right" },
  ]);

  const [stage, setStage] = useState(1);

  const gameMap = useMemo(() => {
    // return createMap(stage);
    if (stage === 1) {
      return [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 2],
      ];
    } else if (stage === 2) {
      return [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 2],
      ];
    } else if (stage === 3) {
      return [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 2],
      ];
    }
  }, [stage]);

  useEffect(() => {
    if (!selectedDirection.direction) {
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
      stage={stage}
      setStage={setStage}
      selectedDirection={selectedDirection}
      setSelectedDirection={setSelectedDirection}
      directions={directions}
      setDirections={setDirections}
      cameraPermissionStatus={cameraPermissionStatus}
      setCameraPermissionStatus={setCameraPermissionStatus}
      gameMap={gameMap}
      currentGameKey={currentGameKey}
    />
  );
};

export default Game1Container;
