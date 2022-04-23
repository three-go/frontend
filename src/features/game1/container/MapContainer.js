import React, { useState, useMemo } from "react";

import useCharacter from "../../../hooks/useCharacter";
import { createMap } from "../../../utils";
import { Map } from "../presenter";

const MapContainer = ({ stage, directions, onAnimationEnd }) => {
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

  const handleMoveCharacter = () => {
    switch (directions[0].direction) {
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
  };

  return (
    <Map
      gameMap={gameMap}
      characterInfo={chracterInfo}
      arrInfo={arrInfo}
      boxStyle={boxStyle}
      directions={directions}
      onMove={handleMoveCharacter}
      onAnimationEnd={onAnimationEnd}
    />
  );
};

export default MapContainer;
