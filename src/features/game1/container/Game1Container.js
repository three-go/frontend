import React, { useState, useEffect } from "react";

import { Game1 } from "..";

const Game1Container = () => {
  const [isReady, setIsReady] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isInput, setIsInput] = useState(false);
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
    count: 10,
    size: 15,
  });

  const [selectedDirection, setSelectedDirection] = useState({});
  const [directions, setDirections] = useState([
    { direction: "down" },
    { direction: "right" },
    { direction: "down" },
    { direction: "right" },
  ]);

  useEffect(() => {
    if (!selectedDirection.direction) {
      return;
    }

    setDirections((prevState) => [...prevState, selectedDirection]);
  }, [selectedDirection]);

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
      setDirections={setDirections}
      directions={directions}
      cameraPermissionStatus={cameraPermissionStatus}
      setCameraPermissionStatus={setCameraPermissionStatus}
    />
  );
};

export default Game1Container;
