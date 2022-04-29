import React, { useEffect } from "react";

import useCharacter from "../../../hooks/useCharacter";
import { map, game } from "../../../common";
import { Map } from "../presenter";

const MapContainer = ({
  status,
  gameMap,
  stage,
  directions,
  setResult,
  score,
  setScore,
  setChance,
}) => {
  const characterInfo = useCharacter(gameMap, score, setScore);

  const arrInfo = {
    columnCount: gameMap && gameMap[0].length,
    rowCount: gameMap && gameMap.length,
  };

  const borderWidth = {
    horizontal: 20 + 2 * arrInfo.columnCount,
    vertical: 15 + 2 * arrInfo.rowCount,
  };

  const boxStyle = {
    boxWidth: (map.width - borderWidth.horizontal) / arrInfo.columnCount,
    boxHeigth: (map.height - borderWidth.vertical) / arrInfo.rowCount,
  };

  const handleCheckStage = (n) => {
    if (n < 3) {
      setResult(game.result.win);
    } else if (stage === 3) {
      setResult(game.result.end);
    }
  };

  useEffect(() => {
    if (status === game.status.play && directions.length === 0) {
      const { x, y } = characterInfo.position;

      if (x === arrInfo.columnCount - 1 && y === arrInfo.rowCount - 1) {
        handleCheckStage(stage);
      } else {
        setChance((prev) => prev - 1);
        setResult(game.result.lose);
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
    <Map
      status={status}
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
