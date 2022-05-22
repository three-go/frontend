import React from "react";

import { render } from "@testing-library/react-native";

import "@testing-library/jest-native";
import "react-native-gesture-handler/jestSetup";
import { GameContextProvider } from "../src/context/GameContext";
import MainContainer from "../src/features/main/container/MainContainer";

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
    useRoute: () => ({}),
  };
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

describe("Container Test", () => {
  it("MainContainer Test", () => {
    const mainContainer = render(
      <GameContextProvider>
        <MainContainer />
      </GameContextProvider>
    );
    const mainContainerJson = mainContainer.toJSON();

    expect(mainContainer.getByTestId("mainContainer")).toBeTruthy();
    expect(mainContainerJson).toBeTruthy();
    expect(mainContainerJson).toMatchSnapshot();
  });
});
