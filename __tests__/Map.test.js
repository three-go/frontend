import React from "react";

import { render } from "@testing-library/react-native";

import { game } from "../src/common/property";
import { map, colors } from "../src/common/constants";
import Map from "../src/features/faceGo/presenter/Map";

game.sounds.wrong.play = jest.fn();
game.sounds.move.play = jest.fn();

const mockWrongSoundPlay = game.sounds.wrong.play;
const mockMoveSoundPlay = game.sounds.move.play;
const mockSetScore = jest.fn();
const mockSoundPlay = jest.fn();
const mockVibrate = jest.fn();

jest.mock("react-native/Libraries/Vibration/Vibration", () => ({
  vibrate: mockVibrate,
}));

jest.mock("react-native-sound", () => {
  const Sound = () => {
    const obj = {};
    obj.sound = "music";
    obj.play = mockSoundPlay;
    return obj;
  };

  return Sound;
});

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

const props = {
  status: game.status.none,
  gameMap: [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 2],
  ],
  characterInfo: {
    isValid: true,
    minusScore: 0,
    position: {
      x: 1,
      y: 2,
    },
    moveDown: jest.fn(),
    moveUp: jest.fn(),
    moveLeft: jest.fn(),
    moveRight: jest.fn(),
  },
  arrInfo: {
    columnCount: 3,
    rowCount: 4,
  },
  boxStyle: {
    boxWidth: (map.width - (20 + 2 * 3)) / 3,
    boxHeigth: (map.height - (15 + 2 * 4)) / 4,
  },
  directions: [
    {
      id: "test1",
      direction: "down",
    },
  ],
  setScore: mockSetScore,
};

global.__reanimatedWorkletInit = () => {};

it("props minusScore가 0이면 setScore가 불리면 안된다.", () => {
  render(<Map {...props} />);
  expect(mockSetScore).not.toHaveBeenCalled();
});

it("props minusScore가 0 보다 크면 setScore가 불려야 한다.", () => {
  props.characterInfo.minusScore = 1;
  render(<Map {...props} />);
  expect(mockSetScore).toHaveBeenCalled();
});

it("game.status.play이고 position이 0, 0 아니면 game.sounds.move.play()가 불리는지?", () => {
  props.status = game.status.play;
  render(<Map {...props} />);
  expect(mockMoveSoundPlay).toHaveBeenCalled();
});

it("characterInfo.isValid가 false이고, game.sounds.wrong.play()가 불리는지?", () => {
  props.characterInfo.isValid = false;
  render(<Map {...props} />);
  expect(mockWrongSoundPlay).toHaveBeenCalled();
});
