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

it("game.status.none ?????? TextTimer??? ?????? ????????? ??????.", () => {
  const faceGoComponent = render(<FaceGo {...props} />);
  const textTimer = faceGoComponent.queryByTestId("timer");

  expect(textTimer).toBeTruthy();
});

it("game.status.none ?????? FaceDirectionRecord??? ?????? ?????? ?????????.", () => {
  const faceGoComponent = render(<FaceGo {...props} />);
  const faceDirectionRecord = faceGoComponent.queryByTestId("faceDirection");

  expect(faceDirectionRecord).toBeNull();
});

it("game.status.open ?????? MapContainer??? ?????? ????????? ??????.", () => {
  props.gameInfo.status = game.status.open;

  const faceGoComponent = render(<FaceGo {...props} />);
  const map = faceGoComponent.queryByTestId("map");

  expect(map).toBeTruthy();
});

it("game.status.directionInput ?????? FaceRecognitionContainer ?????? ????????? ??????.", () => {
  props.gameInfo.status = game.status.directionInput;

  const faceGoComponent = render(<FaceGo {...props} />);
  const faceRecognition = faceGoComponent.queryByTestId("recognition");

  expect(faceRecognition).toBeTruthy();
});

it("game.status.play ?????? MapContainer ?????? ????????? ??????.", () => {
  props.gameInfo.status = game.status.play;

  const faceGoComponent = render(<FaceGo {...props} />);
  const map = faceGoComponent.queryByTestId("map");

  expect(map).toBeTruthy();
});

it("game.result.win ?????? NextStageModalContainer ?????? ????????? ??????.", () => {
  props.gameInfo.result = game.result.win;

  const faceGoComponent = render(<FaceGo {...props} />);
  const NextStageModalContainer =
    faceGoComponent.queryByText(/????????? ?????????????????????/i);

  expect(NextStageModalContainer).toBeTruthy();
});

it("game.result.lose??????, chance??? ??????????????? FailModalContainer ?????? ????????? ??????.", () => {
  props.gameInfo.result = game.result.lose;

  const faceGoComponent = render(<FaceGo {...props} />);
  const FailModalContainer =
    faceGoComponent.queryByText(/????????? ?????????????????????./i);

  expect(FailModalContainer).toBeTruthy();
});

it("game.result.lose??????, chance??? ?????? ?????????????????? ResetModalContainer ?????? ????????? ??????.", () => {
  props.userInfo.chance = -1;

  const faceGoComponent = render(<FaceGo {...props} />);
  const ResetModalContainer =
    faceGoComponent.queryByText(/?????? ????????? ????????????./i);

  expect(ResetModalContainer).toBeTruthy();
});

it("game.result.end ?????? InputModalContainer ?????? ????????? ??????.", () => {
  props.gameInfo.result = game.result.end;

  const faceGoComponent = render(
    <GameContextProvider>
      <FaceGo {...props} />
    </GameContextProvider>
  );
  const InputModalContainer =
    faceGoComponent.queryByText(/?????? ????????? ????????? ?????????/i);

  expect(InputModalContainer).toBeTruthy();
});
