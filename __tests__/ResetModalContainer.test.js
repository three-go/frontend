import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import ResetModalContainer from "../src/components/Modals/ResetModalContainer";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe("ResetModalContainer", () => {
  it("ResetModalContainer render check", () => {
    const component = render(<ResetModalContainer />);

    expect(component.getByText("남은 하트가 없습니다.")).toBeTruthy();
    expect(component.getByText("메인으로")).toBeTruthy();
    expect(component.toJSON).toMatchSnapshot();
    expect(component.toJSON).toBeTruthy();
  });

  it("ResetModalContainer '메인으로' button click", () => {
    const component = render(<ResetModalContainer />);

    const mainNavigateButton = component.getByText("메인으로");
    fireEvent.press(mainNavigateButton);

    expect(mockNavigate.mock.calls.length).toBe(1);
    expect(() => component.getByText("메인으로")).toThrow(
      "Unable to find an element with text: 메인으로"
    );
  });
});
