import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { map } from "../../../common/constants";
import { game } from "../../../common/property";
import useCharacter from "../../../hooks/useCharacter";
import Map from "../presenter/Map";

const MapContainer = ({
  stage,
  status,
  setResult,
  gameMap,
  score,
  setScore,
  directions,
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
      game.sounds.win.play();
    } else if (stage === 3) {
      setResult(game.result.end);
      game.sounds.end.play();
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
        game.sounds.lose.play();
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
      arrInfo={arrInfo}
      boxStyle={boxStyle}
      characterInfo={characterInfo}
      directions={directions}
      setScore={setScore}
    />
  );
};

export default MapContainer;

MapContainer.propTypes = {
  stage: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setResult: PropTypes.func.isRequired,
  gameMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  score: PropTypes.number,
  setScore: PropTypes.func,
  directions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      direction: PropTypes.string,
    })
  ),
  setChance: PropTypes.func.isRequired,
};

MapContainer.defaultProps = {
  score: 500,
  setScore: () => {},
  setChance: () => {},
  directions: [],
};
