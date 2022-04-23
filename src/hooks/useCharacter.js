import React, { useState } from "react";

const useCharacter = (gameMap, score, setScore) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isValid, setIsValid] = useState(true);

  const moveLeft = () => {
    canMove("left") && setPosition({ ...position, x: position.x - 1 });
  };

  const moveRight = () => {
    canMove("right") && setPosition({ ...position, x: position.x + 1 });
  };

  const moveUp = () => {
    canMove("up") && setPosition({ ...position, y: position.y - 1 });
  };

  const moveDown = () => {
    canMove("down") && setPosition({ ...position, y: position.y + 1 });
  };

  const canMove = (direction) => {
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
        nextPosition = gameMap[position.y - 1];
        break;

      case "down":
        isInBoundary = position.x - 1 > -1;
        nextPosition = gameMap[position.y];
        break;
    }

    result = checkMove(isInBoundary, nextPosition);
    setScore((prev) => prev - result.minusScore);
    setIsValid(result.canMove);

    return result.canMove;
  };

  const checkMove = (isInBoundary, nextPosition) => {
    // minusSore 상수 처리 필요
    if (isInBoundary && nextPosition > 0) {
      return { canMove: true, minusScore: 1 };
    }

    if (!isInBoundary) {
      return { canMove: false, minusScore: 21 };
    }

    if (!nextPosition) {
      return { canMove: false, minusScore: 11 };
    }
  };

  return {
    position,
    isValid,
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
  };
};

export default useCharacter;
