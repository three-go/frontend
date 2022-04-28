import React, { useEffect } from "react";

import { map } from "../../../common";
import useCharacter from "../../../hooks/useCharacter";
import { DefaultMap, Map } from "../presenter";

const MapContainer = ({
  gameMap,
  stage,
  directions,
  isStart,
  isReady,
  isInput,
  setIsWin,
  setIsLose,
  score,
  setScore,
  setIsEnd,
  setChance,
}) => {
  const characterInfo = useCharacter(gameMap, score, setScore);

  const arrInfo = {
    columnCount: gameMap && gameMap[0].length,
    rowCount: gameMap && gameMap.length,
  };

  const borderWidth = {
    horizontal: 10 + 2 * arrInfo.columnCount,
    vertical: 10,
  };

  const boxStyle = {
    boxWidth: (map.width - borderWidth.horizontal) / arrInfo.columnCount,
    boxHeigth: (map.height - borderWidth.vertical) / arrInfo.rowCount,
  };

  const handleCheckStage = (n) => {
    if (n < 3) {
      setIsWin(true);
    } else if (stage === 3) {
      setIsEnd(true);
    }
  };

  useEffect(() => {
    if (isInput && isStart && isReady && directions.length === 0) {
      const { x, y } = characterInfo.position;

      if (x === arrInfo.columnCount - 1 && y === arrInfo.rowCount - 1) {
        handleCheckStage(stage);
      } else {
        setChance((prev) => prev - 1);
        setIsLose(true);
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
      setScore={setScore}
    />
  );
};

export default MapContainer;
