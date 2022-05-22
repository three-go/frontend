import { createEntities } from "../src/features/shoutGo/entities";
import physics from "../src/features/shoutGo/physics";

jest.mock("react-native-sound", () => {
  const Sound = () => {
    const obj = {};
    obj.sound = "music";
    obj.setNumberOfLoops = jest.fn();
    obj.play = jest.fn();
    return obj;
  };

  return Sound;
});

describe("physics", () => {
  it("physics update volume and change charactor info test", () => {
    const volume = 20;
    const entities = createEntities();

    const initialCharactorvelocityValue = entities.Character.body.velocity.y;

    const changeEntites = physics(entities, {
      events: [{ type: "decibel", payload: { volume } }],
      time: 1,
      dispatch: () => {},
    });

    const changeCharactorvelocityValue = Math.ceil(
      Math.abs(changeEntites.Character.body.velocity.y)
    );

    expect(changeCharactorvelocityValue - initialCharactorvelocityValue).toBe(
      volume
    );
  });

  it("physics update obstacles info test", () => {
    const volume = 20;
    const entities = createEntities();

    const initialObstacle1PositionX = entities.Obstacle1.body.position.x;
    const initialObstacle2PositionX = entities.Obstacle2.body.position.x;
    const initialObstacle3PositionX = entities.Obstacle3.body.position.x;

    const changeEntites = physics(entities, {
      events: [{ type: "decibel", payload: { volume } }],
      time: 1,
      dispatch: () => {},
    });

    const changeObstacle1PositionX = changeEntites.Obstacle1.body.position.x;
    const changeObstacle2PositionX = changeEntites.Obstacle2.body.position.x;
    const changeObstacle3PositionX = changeEntites.Obstacle3.body.position.x;

    expect(initialObstacle1PositionX !== changeObstacle1PositionX).toBeTruthy();
    expect(initialObstacle2PositionX !== changeObstacle2PositionX).toBeTruthy();
    expect(initialObstacle3PositionX !== changeObstacle3PositionX).toBeTruthy();
  });
});
