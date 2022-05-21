import React, { useContext } from "react";

import { render, fireEvent } from "@testing-library/react-native";
import { Text, Button } from "react-native";

import GameContext, { GameContextProvider } from "../src/context/GameContext";

describe("Context API", () => {
  it("GameContext", () => {
    const testContextValue = "This is context test";

    const TestComponent = () => {
      const { currentGameKey, setCurrentGameKey } = useContext(GameContext);
      return (
        <>
          <Text>{currentGameKey}</Text>
          <Button
            onPress={() => setCurrentGameKey(testContextValue)}
            title="Testing Button"
          />
        </>
      );
    };

    const component = render(
      <GameContextProvider>
        <TestComponent />
      </GameContextProvider>
    );

    expect(component.getByText("Testing Button")).toBeTruthy();

    const testButton = component.getByText("Testing Button");
    fireEvent.press(testButton);

    expect(component.getByText(testContextValue)).toBeTruthy();
    expect(component.toJSON).toMatchSnapshot();
  });
});
