import React, { useEffect } from "react";

import DefaultMap from "../presenter/DefaultMap";
import useCharacter from "../../../hooks/useCharacter";
import { Map } from "../presenter";

const MapContainer = ({
  gameMap,
  stage,
  directions,
  isStart,
  isReady,
  isInput,
  setIsWin,
  score,
  setScore,
}) => {
  const FIXED_WIDTH = 300;
  const FIXED_HEIGHT = 450;
  const characterInfo = useCharacter(gameMap, score, setScore);

  const arrInfo = {
    columnCount: gameMap && gameMap[0].length,
    rowCount: gameMap && gameMap.length,
  };

  const boxStyle = {
    boxWidth: (FIXED_WIDTH - 10) / arrInfo.columnCount,
    boxHeigth: (FIXED_HEIGHT - 10) / arrInfo.rowCount,
  };

  useEffect(() => {
    if (isInput && isStart && isReady && directions.length === 0) {
      const { x, y } = characterInfo.position;
      if (x === arrInfo.columnCount - 1 && y === arrInfo.rowCount - 1) {
        setIsWin(true);
      } else {
        setIsWin(false);
      }
    }

    if (!directions[0]) {
      return;
    }

    switch (isInput && directions[0].direction) {
      case "left":
        characterInfo.moveLeft();
        break;
      case "right":
        characterInfo.moveRight();
        break;
      case "up":
        characterInfo.moveUp();
        break;
      case "down":
        characterInfo.moveDown();
        break;
      default:
        "left";
    }
  }, [directions]);

  return !isStart && isReady ? (
    <DefaultMap gameMap={gameMap} arrInfo={arrInfo} boxStyle={boxStyle} />
  ) : (
    <Map
      gameMap={gameMap}
      characterInfo={characterInfo}
      arrInfo={arrInfo}
      boxStyle={boxStyle}
      directions={directions}
    />
  );
};

export default MapContainer;
