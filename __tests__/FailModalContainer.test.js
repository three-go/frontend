import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import FailModalContainer from "../src/components/Modals/FailModalContainer";

const mockNavigations = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigations,
    }),
  };
});

it("FailModalContainer should render correctly", () => {
  const component = render(
    <FailModalContainer onRetryCurrentStage={() => {}} />
  );

  expect(component).toBeTruthy();
});

it("FailModalContainer should call onClick handler when go to main button is clicked.", () => {
  const mockRetry = jest.fn();
  const { getByText } = render(
    <FailModalContainer onRetryCurrentStage={mockRetry} />
  );

  fireEvent.press(getByText("다시시도"));
  expect(mockRetry).toHaveBeenCalled();
});

it("FailModalContainer should call onClick handler when retry button is clicked.", () => {
  const mockRetry = jest.fn();
  const { getByText } = render(
    <FailModalContainer onRetryCurrentStage={mockRetry} />
  );

  fireEvent.press(getByText("메인으로"));
  expect(mockNavigations).toHaveBeenCalled();
});
