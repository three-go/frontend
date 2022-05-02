import Matter from "matter-js";
import decomp from "poly-decomp";
import { Dimensions } from "react-native";

import { colors } from "../../common/constants";
import { getStoneSizePos } from "../../utils/random";
import { obstacleSvg } from "../../utils/svg";
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

  const stoneA = getStoneSizePos();
  const stoneB = getStoneSizePos(windowWidth * 0.7);
  const stoneC = getStoneSizePos(windowWidth * 1.4);

  return {
    physics: { engine, world },
    Character: Character(
      world,
      "green",
      { x: 50, y: 300 },
      { height: 60, width: 60 }
    ),
    Obstacle1: Obstacle(
      world,
      "Obstacle1",
      "red",
      stoneA.pos,
      stoneA.size,
      obstacleSvg
    ),
    Obstacle2: Obstacle(
      world,
      "Obstacle2",
      "green",
      stoneB.pos,
      stoneB.size,
      obstacleSvg
    ),
    Obstacle3: Obstacle(
      world,
      "Obstacle3",
      "purple",
      stoneC.pos,
      stoneC.size,
      obstacleSvg
    ),
    Ceil: Ceil(
      world,
      colors.dark,
      { x: windowWidth / 2, y: 0 },
      { height: 30, width: windowWidth * 1.5 }
    ),
    Floor: Floor(
      world,
      "orange",
      { x: windowWidth / 2, y: windowHeight },
      { height: 350, width: windowWidth * 1.5 }
    ),
  };
};
