import React from "react";

import { render } from "@testing-library/react-native";
import "react-native-gesture-handler/jestSetup";
import "@testing-library/jest-native";

import App from "../App";

const mockNavigate = jest.fn();
const mockDisPatch = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      dispatch: mockDisPatch,
    }),
  };
});

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter.js", () =>
  require("react-native/Libraries/EventEmitter/__mocks__/NativeEventEmitter.js")
);

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

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

jest.mock("@react-native-community/async-storage", (key, value) => {
  const storage = {};
  storage[key] = value;
  return storage;
});

jest.mock("react-native-permissions", () =>
  require("react-native-permissions/mock")
);

jest.mock("react-native-splash-screen", () => {
  const Module = () => {
    const screen = {
      default: {
        hide: jest.fn(),
      },
    };
    return screen;
  };

  return Module;
});

describe("Component Test", () => {
  it("App Test", () => {
    const app = render(<App />);
    const appJson = app.toJSON();
    const main = app.getByTestId("mainContainer");
    const faceGo = app.getByText("Face Go");
    const ShoutGo = app.getByText("Shout Go");
    const score = app.getByText("점수 보기");
    const exit = app.getByText("게임 종료");

    expect(main).toBeTruthy();
    expect(faceGo).toHaveTextContent("Face Go");
    expect(ShoutGo).toHaveTextContent("Shout Go");
    expect(score).toHaveTextContent("점수 보기");
    expect(exit).toHaveTextContent("게임 종료");
    expect(appJson).toBeTruthy();
    expect(appJson).toMatchSnapshot();
  });
});
