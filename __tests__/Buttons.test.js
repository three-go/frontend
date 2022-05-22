import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import "@testing-library/jest-native";

import { colors } from "../src/common/constants";
import DefaultButton from "../src/components/Buttons/DefaultButton";
import SmallButton from "../src/components/Buttons/SmallButton";
import SquareButton from "../src/components/Buttons/SquareButton";

describe("Button Test", () => {
  it("DefaultButton Test", () => {
    const props = {
      content: "Click",
      color: colors.green,
      onPress: () => "Click Event",
    };

    const defaultButton = render(<DefaultButton {...props} />);
    const defaultButtonJson = defaultButton.toJSON();

    expect(defaultButton.getByText("Click")).toBeTruthy();
    expect(fireEvent.press(defaultButton.getByText("Click"))).toBe(
      "Click Event"
    );
    expect(defaultButtonJson.props.style.backgroundColor).toBe(colors.green);
    expect(defaultButtonJson).toMatchSnapshot();
    expect(defaultButtonJson).toBeTruthy();
  });

  it("SmallButton Test", () => {
    const props = {
      content: "Back",
      color: colors.tealGreen,
      onPress: () => "Go Back",
    };

    const samllButton = render(<SmallButton {...props} />);
    const samllButtonJson = samllButton.toJSON();

    expect(samllButton.getByText("Back")).toBeTruthy();
    expect(fireEvent.press(samllButton.getByText("Back"))).toBe("Go Back");
    expect(samllButtonJson.props.style.backgroundColor).toBe(colors.tealGreen);
    expect(samllButtonJson).toMatchSnapshot();
    expect(samllButtonJson).toBeTruthy();
  });

  it("SquareButton Test", () => {
    const props = {
      content: "Play",
      color: colors.turquoise,
      onPress: () => "Start Game",
    };

    const squareButton = render(<SquareButton {...props} />);
    const squareButtonJson = squareButton.toJSON();

    expect(squareButton.getByText("Play")).toBeTruthy();
    expect(fireEvent.press(squareButton.getByText("Play"))).toBe("Start Game");
    expect(squareButtonJson.props.style.backgroundColor).toBe(colors.turquoise);
    expect(squareButton).toMatchSnapshot();
    expect(squareButtonJson).toBeTruthy();
  });
});
