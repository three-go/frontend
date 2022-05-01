import React, { useState } from "react";

const useCharacter = (gameMap) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [minusScore, setMinusScore] = useState(0);
  const [isValid, setIsValid] = useState(true);

  const moveLeft = () => {
    const { canMove, minusScore } = checkCharacterCanMove("left");
    setMinusScore(minusScore);
    canMove && setPosition({ ...position, x: position.x - 1 });
  };

  const moveRight = () => {
    const { canMove, minusScore } = checkCharacterCanMove("right");
    setMinusScore(minusScore);
    canMove && setPosition({ ...position, x: position.x + 1 });
  };

  const moveUp = () => {
    const { canMove, minusScore } = checkCharacterCanMove("up");
    setMinusScore(minusScore);
    canMove && setPosition({ ...position, y: position.y - 1 });
  };

  const moveDown = () => {
    const { canMove, minusScore } = checkCharacterCanMove("down");
    setMinusScore(minusScore);
    canMove && setPosition({ ...position, y: position.y + 1 });
  };

  const checkCharacterCanMove = (direction) => {
    let isInBoundary = true;
    let nextPosition = -Infinity;
    let result = {};

    switch (direction) {
      case "left":
        isInBoundary = position.x - 1 > -1;
        nextPosition = gameMap[position.y][position.x - 1];
        break;

      case "right":
        isInBoundary = position.x + 1 < gameMap[0].length;
        nextPosition = gameMap[position.y][position.x + 1];
        break;

      case "up":
        isInBoundary = position.y - 1 > -1;
        nextPosition =
          gameMap[position.y - 1] && gameMap[position.y - 1][position.x];
        break;

      case "down":
        isInBoundary = position.y + 1 < gameMap.length;
        nextPosition =
          gameMap[position.y + 1] && gameMap[position.y + 1][position.x];
        break;
    }

    result = checkMove(isInBoundary, nextPosition);
    setIsValid(result.canMove);

    return result;
  };

  const checkMove = (isInBoundary, nextPosition) => {
    const point = {
      move: 1,
      outOfBoundary: 20,
      blocked: 10,
    };

    if (isInBoundary && nextPosition > 0) {
      return { canMove: true, minusScore: point.move };
    }

    if (!isInBoundary) {
      return { canMove: false, minusScore: point.move + point.outOfBoundary };
    }

    if (!nextPosition) {
      return { canMove: false, minusScore: point.move + point.blocked };
    }
  };

  return {
    position,
    minusScore,
    isValid,
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
  };
};

export default useCharacter;
