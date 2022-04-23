import React, { useState, useEffect, useContext, useMemo } from "react";

import { GameContext } from "../../../context";
import { createMap } from "../../../utils";
import { Game1 } from "..";

const Game1Container = () => {
  const { currentGameKey } = useContext(GameContext);

  const [isReady, setIsReady] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isInput, setIsInput] = useState(false);
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
    { direction: "right" },
    { direction: "right" },
    { direction: "right" },
  ]);

  const [stage, setStage] = useState(3);
  const gameMap = useMemo(() => {
    return createMap(stage);
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
      selectedDirection={selectedDirection}
      setSelectedDirection={setSelectedDirection}
      directions={directions}
      setIsWin={setIsWin}
      score={score}
      setScore={setScore}
      stage={stage}
      gameMap={gameMap}
      setDirections={setDirections}
      currentGameKey={currentGameKey}
    />
  );
};

export default Game1Container;
