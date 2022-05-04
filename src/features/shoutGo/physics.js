import Matter from "matter-js";
import { Dimensions } from "react-native";

import { game } from "../../common/property";
import { getObstacleSizePos } from "../../utils/random";

const windowWidth = Dimensions.get("window").width;
const exceptionLabels = ["Floor", "Ceil"];

const physics = (entities, { events, time, dispatch }) => {
  const engine = entities.physics.engine;

  events.forEach(({ type, payload }) => {
    if (type === game.event.decibel) {
      const { volume } = payload;

      if (volume >= -20) {
        const yVelocityValue = -(Math.ceil(volume) + 20);

        Matter.Body.setVelocity(entities.Character.body, {
          x: 0,
          y: yVelocityValue < -20 ? -20 : yVelocityValue,
        });
      }
    }
  });

  Matter.Engine.update(engine, time.delta);

  for (let i = 1; i < 4; i++) {
    if (entities[`Obstacle${i}`].body.bounds.max.x <= 0) {
      const obstacle = getObstacleSizePos(windowWidth * 1.05);

      Matter.Body.setPosition(entities[`Obstacle${i}`].body, obstacle.pos);
    }

    Matter.Body.translate(entities[`Obstacle${i}`].body, { x: -3, y: 0 });

    Matter.Events.on(engine, "collisionStart", (event) => {
      if (!exceptionLabels.includes(event.pairs[0].bodyB.label)) {
        dispatch({ type: game.event.gameOver });
      }
    });
  }

  return entities;
};

export default physics;
