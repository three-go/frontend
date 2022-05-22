import Entities, { createEntities } from "../src/features/shoutGo/entities";

describe("entities test", () => {
  it("Entities object test", () => {
    expect(Entities.physics).toBeTruthy();
    expect(Entities.Character).toBeTruthy();
    expect(Entities.Obstacle1).toBeTruthy();
    expect(Entities.Obstacle2).toBeTruthy();
    expect(Entities.Obstacle3).toBeTruthy();
    expect(Entities.Ceil).toBeTruthy();
    expect(Entities.Floor).toBeTruthy();

    expect(Entities.physics.engine).toBeTruthy();
    expect(Entities.physics.world).toBeTruthy();
  });

  it("createEntities object test", () => {
    const newEntities = createEntities();

    expect(newEntities.physics).toBeTruthy();
    expect(newEntities.Character).toBeTruthy();
    expect(newEntities.Obstacle1).toBeTruthy();
    expect(newEntities.Obstacle2).toBeTruthy();
    expect(newEntities.Obstacle3).toBeTruthy();
    expect(newEntities.Ceil).toBeTruthy();
    expect(newEntities.Floor).toBeTruthy();

    expect(newEntities.physics.engine).toBeTruthy();
    expect(newEntities.physics.world).toBeTruthy();
  });
});
