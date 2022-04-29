import React, { useEffect } from "react";

import useCharacter from "../../../hooks/useCharacter";
import { map, game } from "../../../common";
import { DefaultMap, Map } from "../presenter";

const MapContainer = ({
  status,
  gameMap,
  stage,
  directions,
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
    if (status === game.status.play && directions.length === 0) {
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

    switch (status === game.status.play && directions[0].direction) {
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

  return (
    <>
      {status === game.status.open && (
        <DefaultMap gameMap={gameMap} arrInfo={arrInfo} boxStyle={boxStyle} />
      )}
      {status === game.status.play && (
        <Map
          gameMap={gameMap}
          characterInfo={characterInfo}
          arrInfo={arrInfo}
          boxStyle={boxStyle}
          directions={directions}
          setScore={setScore}
        />
      )}
    </>
  );
};

export default MapContainer;
