import React from "react";

import { render, waitFor } from "@testing-library/react-native";

import { GameContextProvider } from "../src/context/GameContext";
import ShoutGoContainer from "../src/features/shoutGo/container/ShoutGoContainer";
import TimmerContainer from "../src/features/shoutGo/container/TimerContainer";

const mockNavigate = jest.fn();
const mockDisPatch = jest.fn();
const mockPermissionCheck = jest.fn();
const mockPermissionRequest = jest.fn();
let mockSoundLevelStart;
let mockSoundLevelStop;

jest.mock("react-native-permissions", () => {
  const result = {
    check: mockPermissionCheck,
    request: mockPermissionRequest,
    PERMISSIONS: {
      ANDROID: {
        RECORD_AUDIO: "android.permission.RECORD_AUDIO",
      },
      IOS: {
        MICROPHONE: "ios.permission.MICROPHONE",
      },
    },
    RESULTS: {
      UNAVAILABLE: "unavailable",
      BLOCKED: "blocked",
      DENIED: "denied",
      GRANTED: "granted",
      LIMITED: "limited",
    },
  };

  return result;
});

jest.mock("react-native-sound-level", () => {
  mockSoundLevelStart = jest.fn();
  mockSoundLevelStop = jest.fn();

  return {
    start: mockSoundLevelStart,
    stop: mockSoundLevelStop,
    onNewFrame: () => {},
  };
});

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

describe("ShoutGoContainer", () => {
  it("ShoutGoContainer render check", () => {
    const component = render(
      <GameContextProvider>
        <ShoutGoContainer />
      </GameContextProvider>
    );

    expect(mockSoundLevelStart).toBeCalledTimes(1);
    expect(component.getByTestId("gameLayout")).toBeTruthy();
    expect(component.toJSON).toMatchSnapshot();
    expect(component.toJSON).toBeTruthy();
  });

  it("TimerContainer render check", async () => {
    const component = render(<TimmerContainer />);

    waitFor(() => {
      expect(mockPermissionCheck.mock.calls.length).toBe(1);
      expect(component.getByTestId(/게임 시작/)).toBeTruthy();
      expect(component.toJSON).toMatchSnapshot();
      expect(component.toJSON).toBeTruthy();
    });
  });
});
