import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import RetryModalContainer from "../src/components/Modals/RetryModalContainer";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe("RetryModalContainer", () => {
  it("RetryModalContainer render check", () => {
    const monkRetryGame = jest.fn();

    const component = render(
      <RetryModalContainer onRetryGame={monkRetryGame} />
    );

    expect(component.getByText("도전하기")).toBeTruthy();
    expect(component.getByText("메인으로")).toBeTruthy();
    expect(component.toJSON).toMatchSnapshot();
    expect(component.toJSON).toBeTruthy();
  });

  it("RetryModalContainer '도전하기' button click", () => {
    const monkRetryGame = jest.fn();

    const component = render(
      <RetryModalContainer onRetryGame={monkRetryGame} />
    );

    const retryButton = component.getByText("도전하기");
    fireEvent.press(retryButton);

    expect(monkRetryGame.mock.calls.length).toBe(1);
    expect(() => component.getByText("도전하기")).toThrow(
      "Unable to find an element with text: 도전하기"
    );
  });

  it("RetryModalContainer '메인으로' button click", () => {
    const monkRetryGame = jest.fn();

    const component = render(
      <RetryModalContainer onRetryGame={monkRetryGame} />
    );

    const mainNavigateButton = component.getByText("메인으로");
    fireEvent.press(mainNavigateButton);

    expect(mockNavigate.mock.calls.length).toBe(1);
    expect(() => component.getByText("메인으로")).toThrow(
      "Unable to find an element with text: 메인으로"
    );
  });
});
