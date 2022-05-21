import React from "react";

import { render } from "@testing-library/react-native";
import "@testing-library/jest-native";
import "react-native-gesture-handler/jestSetup";

import { camera } from "../src/common/constants";
import { game } from "../src/common/property";
import { GameContextProvider } from "../src/context/GameContext";
import FaceGoContainer from "../src/features/faceGo/container/FaceGoContainer";
import FaceRecognitionContainer from "../src/features/faceGo/container/FaceRecognitionContainer";
import MapContainer from "../src/features/faceGo/container/MapContainer";
import { createMap } from "../src/utils/map";

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
  it("FaceGoContainer Test", () => {
    const faceGoContainer = render(
      <GameContextProvider>
        <FaceGoContainer />
      </GameContextProvider>
    );
    const faceGoContainerJson = faceGoContainer.toJSON();

    expect(faceGoContainer.getByTestId("layout")).toBeTruthy();
    expect(faceGoContainerJson).toBeTruthy();
    expect(faceGoContainerJson).toMatchSnapshot();
  });

  it("FaceRecognitionContainer Test", () => {
    let selectedDirection = {
      id: null,
      direction: null,
    };

    const mockOnSelectedDirection = jest.fn();
    const mockSetCameraPermissionStatus = jest.fn();

    mockOnSelectedDirection.mockReturnValue({
      id: "threeGo333",
      direction: "left",
    });
    mockSetCameraPermissionStatus.mockReturnValue(camera.permissionReady);

    const props = {
      selectedDirection,
      onSelectedDirection: () => {
        selectedDirection = mockOnSelectedDirection();
      },
      cameraPermissionStatus: camera.permissionNotAuthorized,
      setCameraPermissionStatus: mockSetCameraPermissionStatus,
    };

    const faceRecognitionContainer = render(
      <FaceRecognitionContainer {...props} />
    );
    const faceRecognitionContainerJson = faceRecognitionContainer.toJSON();

    expect(
      faceRecognitionContainer.getByTestId("recognition")
    ).toHaveTextContent(
      /권한 승인이 필요 합니다. 해당 서비스를 사용하기 위해서는 카메라 권한 승인이 필요합니다. 해당 권한을 승인하지 않으면 서비스 이용이 제한됩니다./
    );
    expect(faceRecognitionContainerJson).toBeTruthy();
    expect(faceRecognitionContainerJson).toMatchSnapshot();
  });

  it("MapContainer Test", () => {
    global.__reanimatedWorkletInit = () => {};

    const props = {
      stage: 1,
      status: game.status.open,
      setResult: jest.fn(),
      gameMap: createMap(1),
      score: 0,
      setScore: jest.fn(),
      directions: [
        { id: "id1", direction: "right" },
        { id: "id2", direction: "right" },
        { id: "id3", direction: "down" },
        { id: "id4", direction: "down" },
        { id: "id5", direction: "down" },
      ],
      setChance: jest.fn(),
    };

    const mapContainer = render(<MapContainer {...props} />);
    const mapContainerJson = mapContainer.toJSON();

    mapContainer.debug();

    expect(mapContainer.getByTestId("map")).toHaveTextContent("Start");
    expect(mapContainer.getByTestId("map")).toHaveTextContent("End");
    expect(mapContainerJson).toBeTruthy();
    expect(mapContainerJson).toMatchSnapshot();
  });
});
