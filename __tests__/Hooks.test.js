import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import { Button, View, Text } from "react-native";

import "@testing-library/jest-native";
import "react-native-gesture-handler/jestSetup";
import useCharacter from "../src/hooks/useCharacter";

const Test = () => {
  const character = useCharacter([
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 2],
  ]);

  const handleMoveCharacter = () => {
    character.moveDown();
  };

  return (
    <View>
      <Button onPress={handleMoveCharacter} title="MOVE" testID="testButton" />
      );
      <Text testID="xPosition">{character.position.x}</Text>
      <Text testID="yPosition">{character.position.y}</Text>
      <Text testID="minusScore">{character.minusScore}</Text>
    </View>
  );
};

describe("Hooks Test", () => {
  it("useCharacter Test", () => {
    const test = render(<Test />);
    const testJson = test.toJSON();
    const button = test.getByTestId("testButton");
    const xPos = test.getByTestId("xPosition");
    const yPos = test.getByTestId("yPosition");
    const minusScore = test.getByTestId("minusScore");

    expect(button).toHaveTextContent("MOVE");
    expect(xPos).toHaveTextContent("0");
    expect(yPos).toHaveTextContent("0");
    expect(minusScore).toHaveTextContent("0");
    expect(testJson).toBeTruthy();
    expect(testJson).toMatchSnapshot();

    fireEvent.press(test.getByTestId("testButton"));

    expect(xPos).toHaveTextContent("0");
    expect(yPos).toHaveTextContent("1");
    expect(minusScore).toHaveTextContent("1");
  });
});
