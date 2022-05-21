import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import NextStageModalContainer from "../src/components/Modals/NextStageModalContainer";

describe("NextStageModalContainer", () => {
  it("NextStageModalContainer render check", () => {
    const mockOnNextStage = jest.fn();

    const component = render(
      <NextStageModalContainer onNextStage={mockOnNextStage} />
    );

    expect(component.getByText("탈출에 성공하셨습니다.")).toBeTruthy();
    expect(component.getByText("다음 단계로")).toBeTruthy();
    expect(component.toJSON).toMatchSnapshot();
  });

  it("NextStageModalContainer '다음 단계로' button click", () => {
    const mockOnNextStage = jest.fn();

    const component = render(
      <NextStageModalContainer onNextStage={mockOnNextStage} />
    );

    const nextStageButton = component.getByText("다음 단계로");
    fireEvent.press(nextStageButton);

    expect(mockOnNextStage.mock.calls.length).toBe(1);
    expect(() => component.getByText("다음 단계로")).toThrow(
      "Unable to find an element with text: 다음 단계로"
    );
  });
});
