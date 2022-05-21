import React from "react";

import { render, act } from "@testing-library/react-native";

import "@testing-library/jest-native";
import "react-native-gesture-handler/jestSetup";
import { game } from "../src/common/property";
import TextTimer from "../src/components/Timers/TextTimer";

jest.mock("react-native-sound", () => {
  const Sound = () => {
    const obj = {};
    obj.sound = "music";
    return obj;
  };

  return Sound;
});

jest.useFakeTimers();

describe("TextTimer Test", () => {
  it("TextTimer Test", () => {
    const props = {
      onTimerEnd: jest.fn(),
      status: game.status.none,
    };

    const textTimer = render(<TextTimer {...props} />);
    const textTimerJson = textTimer.toJSON();

    expect(textTimerJson).toBeTruthy();
    expect(textTimerJson).toMatchSnapshot();
    expect(textTimer.getByTestId("timer")).toHaveTextContent("게임시작");
    expect(textTimer.getByTestId("timer")).toHaveTextContent("3초 전");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(textTimer.getByTestId("timer")).toHaveTextContent("2초 전");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(textTimer.getByTestId("timer")).toHaveTextContent("1초 전");
  });
});
