import React, { useState } from "react";

const useCharacter = (gameMap) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isValid, setIsValid] = useState(false);

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
    let canMove = false;

    switch (direction) {
      case "left":
        canMove = position.x - 1 > -1;
        break;
      case "right":
        canMove = position.x + 1 < gameMap[0].length;
        break;
      case "up":
        canMove = position.y - 1 > -1;
        break;
      case "down":
        canMove = position.y + 1 < gameMap.length;
        break;
    }

    canMove ? setIsValid(true) : setIsValid(false);

    return canMove;
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
