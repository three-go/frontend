import React from "react";

import { render } from "@testing-library/react-native";

import { game } from "../src/common/property";
import { camera } from "../src/common/constants";
import { GameContextProvider } from "../src/context/GameContext";
import FaceGo from "../src/features/faceGo/presenter/FaceGo";

jest.mock("react-native-sound", () => {
  const Sound = () => {
    const obj = {};
    obj.sound = "music";
    obj.play = jest.fn();
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

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter.js", () =>
  require("react-native/Libraries/EventEmitter/__mocks__/NativeEventEmitter.js")
);

jest.mock("@react-native-community/async-storage", (key, value) => {
  const storage = {};
  storage[key] = value;
  return storage;
});

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

const props = {
  gameInfo: {
    stage: 1,
    status: game.status.none,
    setStatus: jest.fn(),
    result: game.result.none,
    setResult: jest.fn(),
    currentGameKey: "faceGo",
    gameMap: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 2],
    ],
    handleNextStage: jest.fn(),
    handleRetryStage: jest.fn(),
    handleSetStatusOpen: jest.fn(),
  },
  userInfo: {
    score: 500,
    setScore: jest.fn(),
    chance: 3,
    setChance: jest.fn(),
    directions: [],
  },
  cameraInfo: {
    selectedDirection: {
      id: null,
      direction: null,
    },
    setSelectedDirection: jest.fn(),
    cameraPermissionStatus: camera.permissionReady,
    setCameraPermissionStatus: jest.fn(),
  },
};

global.__reanimatedWorkletInit = () => {};

it("game.status.none 일때 TextTimer가 렌더 되어야 한다.", () => {
  const faceGoComponent = render(<FaceGo {...props} />);
  const textTimer = faceGoComponent.queryByTestId("timer");

  expect(textTimer).toBeTruthy();
});

it("game.status.none 일때 FaceDirectionRecord가 렌더 되면 안된다.", () => {
  const faceGoComponent = render(<FaceGo {...props} />);
  const faceDirectionRecord = faceGoComponent.queryByTestId("faceDirection");

  expect(faceDirectionRecord).toBeNull();
});

it("game.status.open 일때 MapContainer가 렌더 되어야 한다.", () => {
  props.gameInfo.status = game.status.open;

  const faceGoComponent = render(<FaceGo {...props} />);
  const map = faceGoComponent.queryByTestId("map");

  expect(map).toBeTruthy();
});

it("game.status.directionInput 일때 FaceRecognitionContainer 렌더 되어야 한다.", () => {
  props.gameInfo.status = game.status.directionInput;

  const faceGoComponent = render(<FaceGo {...props} />);
  const faceRecognition = faceGoComponent.queryByTestId("recognition");

  expect(faceRecognition).toBeTruthy();
});

it("game.status.play 일때 MapContainer 렌더 되어야 한다.", () => {
  props.gameInfo.status = game.status.play;

  const faceGoComponent = render(<FaceGo {...props} />);
  const map = faceGoComponent.queryByTestId("map");

  expect(map).toBeTruthy();
});

it("game.result.win 일때 NextStageModalContainer 렌더 되어야 한다.", () => {
  props.gameInfo.result = game.result.win;

  const faceGoComponent = render(<FaceGo {...props} />);
  const NextStageModalContainer =
    faceGoComponent.queryByText(/탈출에 성공하셨습니다/i);

  expect(NextStageModalContainer).toBeTruthy();
});

it("game.result.lose이고, chance가 남아있으면 FailModalContainer 렌더 되어야 한다.", () => {
  props.gameInfo.result = game.result.lose;

  const faceGoComponent = render(<FaceGo {...props} />);
  const FailModalContainer =
    faceGoComponent.queryByText(/탈출에 실패하셨습니다./i);

  expect(FailModalContainer).toBeTruthy();
});

it("game.result.lose이고, chance가 모두 소모되었으면 ResetModalContainer 렌더 되어야 한다.", () => {
  props.userInfo.chance = -1;

  const faceGoComponent = render(<FaceGo {...props} />);
  const ResetModalContainer =
    faceGoComponent.queryByText(/남은 하트가 없습니다./i);

  expect(ResetModalContainer).toBeTruthy();
});

it("game.result.end 일때 InputModalContainer 렌더 되어야 한다.", () => {
  props.gameInfo.result = game.result.end;

  const faceGoComponent = render(
    <GameContextProvider>
      <FaceGo {...props} />
    </GameContextProvider>
  );
  const InputModalContainer =
    faceGoComponent.queryByText(/점수 기록에 사용할 이름을/i);

  expect(InputModalContainer).toBeTruthy();
});
