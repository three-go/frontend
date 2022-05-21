import React from "react";

import { render, fireEvent } from "@testing-library/react-native";
import { Text, View } from "react-native";

import "@testing-library/jest-native";
import "react-native-gesture-handler/jestSetup";
import { camera } from "../src/common/constants";
import { game } from "../src/common/property";
import Carousel from "../src/components/Layouts/Carousel";
import GameLayout from "../src/components/Layouts/GameLayout";

const mockNavigate = jest.fn();
const mockDisPatch = jest.fn();

jest.mock("react-native-sound", () => {
  const Sound = () => {
    const obj = {};
    obj.sound = "music";
    return obj;
  };

  return Sound;
});

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      dispatch: mockDisPatch,
    }),
  };
});

describe("Layout Test", () => {
  it("Carousel Test", () => {
    const props = {
      content: [
        { title: "Title1", description: "description1" },
        { title: "Title2", description: "description2" },
      ],
      renderItem: ({ item }) => {
        return (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        );
      },
      size: {
        SCREEN_WIDTH: 300,
        GAP: 15,
        OFFSET: 15,
        PAGE_WIDTH: 300 - (15 + 15) * 2,
      },
    };

    const carousel = render(<Carousel {...props} />);
    const carouselJson = carousel.toJSON();

    expect(carousel.getByText("Title1")).toBeTruthy();
    expect(carousel.getByText("description1")).toBeTruthy();
    expect(carousel.getByText("Title2")).toBeTruthy();
    expect(carousel.getByText("description2")).toBeTruthy();
    expect(carouselJson).toMatchSnapshot();
    expect(carouselJson).toBeTruthy();
  });

  it("GameLayout Test", () => {
    const props = {
      status: "mapOpen",
      setStatus: jest.fn(),
      chance: 3,
      score: 0,
      cameraPermissionStatus: camera.permissionNotAuthorized,
      currentGameKey: game.keys[0],
    };

    const gameLayout = render(
      <GameLayout {...props}>
        <Text>children component</Text>
      </GameLayout>
    );
    const gameLayoutJson = gameLayout.toJSON();
    const backButton = gameLayout.getByTestId("backButton");
    fireEvent.press(backButton);

    expect(gameLayout.getByText("children component")).toBeTruthy();
    expect(gameLayoutJson).toMatchSnapshot();
    expect(gameLayoutJson).toBeTruthy();
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
