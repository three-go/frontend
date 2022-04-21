import React, { useState, useMemo } from "react";

import { Map } from "../presenter";
import useCharacter from "../../../hooks/useCharacter";
import { createMap } from "../../../utils";

const MapContainer = ({ stage }) => {
  const FIXED_WIDTH = 300;
  const FIXED_HEIGHT = 450;

  const gameMap = useMemo(() => {
    return createMap(stage);
  }, [stage]);
  const chracterInfo = useCharacter(gameMap);

  const arrInfo = {
    columnCount: gameMap[0].length,
    rowCount: gameMap.length,
  };

  const boxStyle = {
    boxWidth: FIXED_WIDTH / arrInfo.columnCount,
    boxHeigth: FIXED_HEIGHT / arrInfo.rowCount,
  };

  // 움직임 테스트용 데이터
  const testDirection = ["down", "down", "down", "right", "right"];
  const [testIndex, setTestIndex] = useState(0);

  const handleMoveCharacter = () => {
    switch (testDirection[testIndex]) {
      case "left":
        chracterInfo.moveLeft();
        break;
      case "right":
        chracterInfo.moveRight();
        break;
      case "up":
        chracterInfo.moveUp();
        break;
      case "down":
        chracterInfo.moveDown();
        break;
    }

    // 움직임 테스트용 로직
    setTestIndex(testIndex + 1);
  };

  return (
    <Map
      gameMap={gameMap}
      characterInfo={chracterInfo}
      arrInfo={arrInfo}
      boxStyle={boxStyle}
      onMove={handleMoveCharacter}
    />
  );
};

export default MapContainer;
