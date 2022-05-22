import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const getObstacleSizePos = (addToPosX = 0) => {
  const yPosTop = -Math.floor(Math.random() * 500 + 200);
  let width = 140;
  let height = 70;

  const obstacle = {
    pos: {
      x: windowWidth + addToPosX,
      y: windowHeight + yPosTop,
    },
    size: {
      width,
      height,
    },
  };

  return obstacle;
};
