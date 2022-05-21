import React from "react";

import { render } from "@testing-library/react-native";

import InputModalContainer from "../src/components/Modals/InputModalContainer";
import { GameContextProvider } from "../src/context/GameContext";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock("@react-native-community/async-storage", (key, value) => {
  const storage = {
    setItemToAsync: () => {},
    getItemFromAsync: () => {},
  };
  storage[key] = value;
  return storage;
});

describe("InputModalContainer", () => {
  it("InputModalContainer render check", () => {
    const score = 100;
    const component = render(
      <GameContextProvider>
        <InputModalContainer score={score} />
      </GameContextProvider>
    );

    expect(component.getByText(new RegExp(score, "i"))).toBeTruthy();
    expect(component.toJSON).toMatchSnapshot();
    expect(component.toJSON).toBeTruthy();
  });
});
