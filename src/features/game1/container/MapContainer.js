import React, { useEffect } from "react";

import useCharacter from "../../../hooks/useCharacter";
import { Map } from "../presenter";
import DefaultMap from "../presenter/DefaultMap";

const MapContainer = ({
  gameMap,
  setDirections,
  stage,
  setStage,
  directions,
  isStart,
  isReady,
  isInput,
  setIsWin,
  score,
  setScore,
  setIsReady,
  setIsStart,
  setIsInput,
  setReadyTimer,
  setStartTimer,
  setInputTimer,
}) => {
  const FIXED_WIDTH = 300;
  const FIXED_HEIGHT = 450;
  const characterInfo = useCharacter(gameMap, score, setScore);

  const arrInfo = {
    columnCount: gameMap && gameMap[0].length,
    rowCount: gameMap && gameMap.length,
  };

  const borderWidth = {
    horizontal: 10 + 2 * arrInfo.columnCount,
    vertical: 10 + 2 * arrInfo.columnCount,
  };

  const boxStyle = {
    boxWidth: (FIXED_WIDTH - borderWidth.horizontal) / arrInfo.columnCount,
    boxHeigth: (FIXED_HEIGHT - borderWidth.vertical) / arrInfo.rowCount,
  };

  const handleNextStage = (n) => {
    if (n < 3) {
      setStage((prev) => prev + 1);
      // setIsWin(true);
      setIsReady(false);
      setIsStart(false);
      setIsInput(false);
      setReadyTimer((prev) => {
        return {
          ...prev,
          count: 3,
        };
      });
      setStartTimer((prev) => {
        return {
          ...prev,
          count: 3,
        };
      });
      setInputTimer((prev) => {
        return {
          ...prev,
          count: 3,
        };
      });
      setDirections([
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
    } else if (stage === 3) {
      console.log("마지막 탄 입니다.");
      // setIsWin(false);
    }
  };

  useEffect(() => {
    if (isInput && isStart && isReady && directions.length === 0) {
      const { x, y } = characterInfo.position;

      if (x === arrInfo.columnCount - 1 && y === arrInfo.rowCount - 1) {
        handleNextStage(stage);
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
