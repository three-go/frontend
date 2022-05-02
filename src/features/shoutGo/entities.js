import Matter from "matter-js";
import decomp from "poly-decomp";
import { Dimensions } from "react-native";

import { colors } from "../../common/constants";
import { getObstacleSizePos } from "../../utils/random";
import {
  characterSvg,
  charaterPath,
  sharkSvg,
  sharkPath,
} from "../../utils/svg";
import Ceil from "../shoutGo/presenter/Ceil";
import Floor from "../shoutGo/presenter/Floor";
import Obstacle from "../shoutGo/presenter/Obstacle";
import Character from "./presenter/Character";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default () => {
  Matter.Common.setDecomp(decomp);
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  engine.gravity.y = 0.6;

  const obstacleA = getObstacleSizePos();
  const obstacleB = getObstacleSizePos(windowWidth * 0.7);
  const obstacleC = getObstacleSizePos(windowWidth * 1.4);

  return {
    physics: { engine, world },
    Character: Character(
      world,
      { x: 50, y: 250 },
      { height: 50, width: 70 },
      { xml: characterSvg, path: charaterPath }
    ),
    Obstacle1: Obstacle(world, "Obstacle1", obstacleA.pos, obstacleA.size, {
      xml: sharkSvg,
      path: sharkPath,
    }),
    Obstacle2: Obstacle(world, "Obstacle2", obstacleB.pos, obstacleB.size, {
      xml: sharkSvg,
      path: sharkPath,
    }),
    Obstacle3: Obstacle(world, "Obstacle3", obstacleC.pos, obstacleC.size, {
      xml: sharkSvg,
      path: sharkPath,
    }),
    Ceil: Ceil(
      world,
      colors.dark,
      { x: windowWidth / 2, y: 0 },
      { height: 30, width: windowWidth * 2 }
    ),
    Floor: Floor(
      world,
      { x: windowWidth / 2, y: windowHeight },
      { height: 300, width: windowWidth * 2 }
    ),
  };
};
