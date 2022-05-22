import React from "react";

import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { camera } from "../src/common/constants";
import FaceRecognition from "../src/features/faceGo/presenter/FaceRecognition";

const mockExitApp = jest.fn();

jest.mock("react-native-exit-app", () => {
  const RNExitApp = {};
  RNExitApp.exitApp = mockExitApp;

  return RNExitApp;
});

const props = {
  selectedDirection: {
    id: "test1",
    direction: "down",
  },
  handlerFacePosition: jest.fn(),
  cameraPermissionStatus: camera.permissionNotAuthorized,
  setCameraPermissionStatus: jest.fn(),
  isDirectionPreviewTextShow: true,
};

it("카메라 permission이 없을 때 설정으로 가기 버튼을 클릭하면 RNExitApp.exitApp이 실행되어야 한다.", () => {
  const { getByTestId } = render(<FaceRecognition {...props} />);

  fireEvent.press(getByTestId("smallButton"));
  waitFor(() => {
    expect(mockExitApp).toHaveBeenCalled();
  });
});
