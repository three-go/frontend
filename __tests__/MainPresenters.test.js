import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import "@testing-library/jest-native";
import "react-native-gesture-handler/jestSetup";
import RNExitApp from "react-native-exit-app";

import GameGuide from "../src/features/main/presenter/GameGuide";
import Main from "../src/features/main/presenter/Main";
import Page from "../src/features/main/presenter/Page";

jest.mock("react-native-sound", () => {
  const Sound = () => {
    const obj = {};
    obj.sound = "music";
    obj.setNumberOfLoops = jest.fn();
    obj.play = jest.fn();
    return obj;
  };

  return Sound;
});

const size = {
  SCREEN_WIDTH: 300,
  GAP: 15,
  OFFSET: 15,
  PAGE_WIDTH: 300 - (15 + 15) * 2,
};

describe("Presenter Test", () => {
  it("Main Test", () => {
    const mockExitApp = jest.spyOn(RNExitApp, "exitApp");
    mockExitApp.mockReturnValue("exit");
    const mockShowScoreModal = jest.fn();
    const mockSetGameNameAndShowDescriptionModal = jest.fn();

    const props = {
      onExitApp: () => {
        RNExitApp.exitApp();
      },
      onShowScoreModal: mockShowScoreModal,
      onSetGameNameAndShowDescriptionModal:
        mockSetGameNameAndShowDescriptionModal,
    };

    const main = render(<Main {...props} />);
    const mainJson = main.toJSON();
    const faceGoButton = main.getByText("Face Go");
    const shoutGoButton = main.getByText("Shout Go");
    const scoreButton = main.getByText("점수 보기");
    const exitButton = main.getByText("게임 종료");

    expect(faceGoButton).toHaveTextContent("Face Go");
    expect(shoutGoButton).toHaveTextContent("Shout Go");
    expect(scoreButton).toHaveTextContent("점수 보기");
    expect(exitButton).toHaveTextContent("게임 종료");
    expect(mainJson).toBeTruthy();
    expect(mainJson).toMatchSnapshot();

    fireEvent.press(exitButton);
    expect(mockExitApp).toHaveBeenCalled();

    fireEvent.press(scoreButton);
    expect(mockShowScoreModal).toHaveBeenCalled();

    fireEvent.press(faceGoButton);
    expect(mockSetGameNameAndShowDescriptionModal).toHaveBeenCalled();

    fireEvent.press(shoutGoButton);
    expect(mockSetGameNameAndShowDescriptionModal).toHaveBeenCalled();
  });

  it("GameGuide Test", () => {
    const props = {
      item: {
        title: "게임설명",
        titleContent: "게임방법",
        children: [
          {
            id: "id1",
            title: "조작",
            content: "조작설명",
            image: 0,
          },
        ],
      },
      style: {
        papeWrapper: (prop) => {
          return {
            width: prop.PAGE_WIDTH,
            marginHorizontal: prop.GAP / 2,
          };
        },
      },
    };
    const gameGuide = render(
      <GameGuide item={props.item} style={props.style.papeWrapper(size)} />
    );
    const gameGuideJson = gameGuide.toJSON();

    expect(gameGuide.getByText("게임설명")).toHaveTextContent("게임설명");
    expect(gameGuide.getByText("게임방법")).toHaveTextContent("게임방법");
    expect(gameGuide.getByText("조작")).toHaveTextContent("조작");
    expect(gameGuide.getByText("조작설명")).toHaveTextContent("조작설명");
    expect(gameGuideJson).toBeTruthy();
    expect(gameGuideJson).toMatchSnapshot();
  });

  it("Page Test", () => {
    const props = {
      item: [
        { id: "id1", name: "John", score: 300 },
        { id: "id2", name: "Tom", score: 500 },
      ],
      style: {
        pageWrapper: (prop) => {
          return {
            width: prop.PAGE_WIDTH,
            marginHorizontal: prop.GAP / 2,
          };
        },
      },
    };
    const page = render(<Page {...props} />);
    const pageJson = page.toJSON();
    const score1 = page.getByText("300");
    const score2 = page.getByText("500");
    const name1 = page.getByText("John");
    const name2 = page.getByText("Tom");

    expect(score1).toHaveTextContent("300");
    expect(score2).toHaveTextContent("500");
    expect(name1).toHaveTextContent("John");
    expect(name2).toHaveTextContent("Tom");
    expect(pageJson).toBeTruthy();
    expect(pageJson).toMatchSnapshot();

    const emptyProps = {
      item: [],
      style: {
        pageWrapper: (prop) => {
          return {
            width: prop.PAGE_WIDTH,
            marginHorizontal: prop.GAP / 2,
          };
        },
      },
    };
    const emptyPage = render(<Page {...emptyProps} />);
    const emptyPageJson = emptyPage.toJSON();
    const emptyPageText = emptyPage.getByText("등록된 정보가 없습니다.");

    expect(emptyPageText).toHaveTextContent("등록된 정보가 없습니다.");
    expect(emptyPageJson).toBeTruthy();
    expect(emptyPageJson).toMatchSnapshot();
  });
});
