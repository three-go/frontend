import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import GameHeader from "../src/components/Headers/GameHeader";

jest.mock("react-native-sound", () => {
  return function Test() {
    return {};
  };
});

describe("GameHeader.js", () => {
  const chance = 3;
  const score = 100;
  const cameraPermissionStatus = "READY";

  it("FaceGo before the map is covered", () => {
    const mockOnPressBack = jest.fn();
    const mockSetStatus = jest.fn();
    const gameStatus = "mapOpen";
    const gameType = "faceGo";

    const component = render(
      <GameHeader
        status={gameStatus}
        setStatus={mockSetStatus}
        onPressBack={mockOnPressBack}
        chance={chance}
        score={score}
        cameraPermissionStatus={cameraPermissionStatus}
        currentGameKey={gameType}
      />
    );

    const backButton = component.getByTestId("backIcon");
    fireEvent.press(backButton);

    expect(component.getByText(/맵이 가려지기/i)).toBeTruthy();
    expect(component.getByTestId("backIcon")).toBeTruthy();
    expect(mockOnPressBack.mock.calls.length).toBe(1);
    expect(component.toJSON().children[2].children.length).toBe(3);
  });

  it("FaceGo before the input ends", () => {
    const mockOnPressBack = jest.fn();
    const mockSetStatus = jest.fn();
    const gameStatus = "directionInput";
    const gameType = "faceGo";

    const component = render(
      <GameHeader
        status={gameStatus}
        setStatus={mockSetStatus}
        onPressBack={mockOnPressBack}
        chance={chance}
        score={score}
        cameraPermissionStatus={cameraPermissionStatus}
        currentGameKey={gameType}
      />
    );

    const backButton = component.getByTestId("backIcon");
    fireEvent.press(backButton);

    expect(component.getByText(/입력이 종료되기/i)).toBeTruthy();
    expect(component.getByTestId("backIcon")).toBeTruthy();
    expect(mockOnPressBack.mock.calls.length).toBe(1);
    expect(component.toJSON().children[2].children.length).toBe(3);
  });

  it("FaceGo results for the game", () => {
    const mockOnPressBack = jest.fn();
    const mockSetStatus = jest.fn();
    const gameStatus = "resultPlay";
    const gameType = "faceGo";

    const component = render(
      <GameHeader
        status={gameStatus}
        setStatus={mockSetStatus}
        onPressBack={mockOnPressBack}
        chance={chance}
        score={score}
        cameraPermissionStatus={cameraPermissionStatus}
        currentGameKey={gameType}
      />
    );

    const backButton = component.getByTestId("backIcon");
    fireEvent.press(backButton);

    expect(component.getByText(/SCORE/i)).toBeTruthy();
    expect(component.getByText(new RegExp(score, "i"))).toBeTruthy();
    expect(component.getByTestId("backIcon")).toBeTruthy();
    expect(mockOnPressBack.mock.calls.length).toBe(1);
    expect(component.toJSON().children[2].children.length).toBe(3);
  });

  it("shoutGo play game", () => {
    const mockOnPressBack = jest.fn();
    const mockSetStatus = jest.fn();
    const gameStatus = "resultPlay";
    const gameType = "shoutGo";

    const component = render(
      <GameHeader
        status={gameStatus}
        setStatus={mockSetStatus}
        onPressBack={mockOnPressBack}
        chance={chance}
        score={score}
        cameraPermissionStatus={cameraPermissionStatus}
        currentGameKey={gameType}
      />
    );

    const backButton = component.getByTestId("backIcon");
    fireEvent.press(backButton);

    expect(component.getByText(/SCORE/i)).toBeTruthy();
    expect(component.getByText(new RegExp(score, "i"))).toBeTruthy();
    expect(component.getByTestId("backIcon")).toBeTruthy();
    expect(mockOnPressBack.mock.calls.length).toBe(1);
    expect(component.toJSON().children[2].children.length).toBe(3);
    expect(component.toJSON).toMatchSnapshot();
  });
});
