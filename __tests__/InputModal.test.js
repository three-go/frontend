import React from "react";

import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";

import InputModal from "../src/components/Modals/InputModal";

describe("InputModal", () => {
  it("InputModal render check", () => {
    const score = 100;
    const modalVisible = true;
    const name = "test";
    const mockSetName = jest.fn();
    const mockOnRegister = jest.fn();

    const component = render(
      <InputModal
        score={score}
        modalVisible={modalVisible}
        name={name}
        setName={mockSetName}
        onRegister={mockOnRegister}
      >
        <Text>Testing</Text>
      </InputModal>
    );

    expect(component.getByText(new RegExp(score, "i"))).toBeTruthy();
    expect(component.getByText(/점수 기록에 사용할 이름을/i)).toBeTruthy();
    expect(component.getByPlaceholderText("이름을 입력하세요.")).toBeTruthy();
    expect(component.getByText("Testing")).toBeTruthy();
    expect(component.toJSON).toMatchSnapshot();
  });
  it("InputModal submit textInput", () => {
    const score = 100;
    const modalVisible = true;
    const name = "test";
    const mockSetName = jest.fn();
    const mockOnRegister = jest.fn();

    const component = render(
      <InputModal
        score={score}
        modalVisible={modalVisible}
        name={name}
        setName={mockSetName}
        onRegister={mockOnRegister}
      >
        <Text>Testing</Text>
      </InputModal>
    );

    const textInput = component.getByPlaceholderText("이름을 입력하세요.");
    fireEvent(textInput, "submitEditing");

    expect(mockOnRegister.mock.calls.length).toBe(1);
  });
});
