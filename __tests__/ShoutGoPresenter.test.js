import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Matter from "matter-js";
import decomp from "poly-decomp";

import { GameContextProvider } from "../src/context/GameContext";
import CeilContainer from "../src/features/shoutGo/presenter/Ceil";
import CharacterContainer from "../src/features/shoutGo/presenter/Character";
import FloorContainer from "../src/features/shoutGo/presenter/Floor";
import ObstacleContainer from "../src/features/shoutGo/presenter/Obstacle";
import ShoutGo from "../src/features/shoutGo/presenter/ShoutGo";
import Timer from "../src/features/shoutGo/presenter/Timer";
import {
  characterSvg,
  charaterPath,
  sharkSvg,
  sharkPath,
} from "../src/utils/svg";

const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

const mockNavigate = jest.fn();
const mockDisPatch = jest.fn();

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

jest.mock("@react-native-community/async-storage", (key, value) => {
  const storage = {};
  storage[key] = value;
  return storage;
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

jest.mock("react-native-permissions", () => {
  const result = {
    RESULTS: {
      UNAVAILABLE: "unavailable",
      BLOCKED: "blocked",
      DENIED: "denied",
      GRANTED: "granted",
      LIMITED: "limited",
    },
  };

  return result;
});

describe("ShoutGoPresenter", () => {
  it("Ceil presenter render check", () => {
    const entityInfo = {
      label: "Ceil",
      color: "testColor",
      pos: { x: 10, y: 10 },
      size: { width: 100, height: 100 },
    };
    const entity = CeilContainer(
      world,
      entityInfo.color,
      entityInfo.pos,
      entityInfo.size
    );
    const area = entityInfo.size.width * entityInfo.size.height;

    expect(entity.body.label).toBe(entityInfo.label);
    expect(entity.body.area).toEqual(area);
    expect(entity.pos).toEqual(entityInfo.pos);
    expect(entity.color).toBe(entityInfo.color);
    expect(entity.renderer.type.name).toBe(entityInfo.label);
  });

  it("Character presenter render check", () => {
    const entityInfo = {
      label: "Character",
      pos: { x: 10, y: 10 },
      size: { width: 100, height: 100 },
      svg: { xml: characterSvg, path: charaterPath },
    };
    const entity = CharacterContainer(
      world,
      entityInfo.pos,
      entityInfo.size,
      entityInfo.svg
    );
    const area = entityInfo.size.width * entityInfo.size.height;

    expect(entity.body.label).toBe(entityInfo.label);
    expect(entity.body.area).toEqual(area);
    expect(entity.pos).toEqual(entityInfo.pos);
    expect(entity.svg).toEqual(entityInfo.svg);
  });

  it("Floor presenter render check", () => {
    const entityInfo = {
      label: "Floor",
      pos: { x: 10, y: 10 },
      size: { width: 100, height: 100 },
    };
    const entity = FloorContainer(world, entityInfo.pos, entityInfo.size);
    const area = entityInfo.size.width * entityInfo.size.height;

    expect(entity.body.label).toBe(entityInfo.label);
    expect(entity.body.area).toEqual(area);
    expect(entity.pos).toEqual(entityInfo.pos);
  });

  it("Obstacle presenter render check", () => {
    Matter.Common.setDecomp(decomp);
    const entityInfo = {
      label: "Obstacle",
      pos: { x: 10, y: 10 },
      size: { width: 100, height: 100 },
      svg: { xml: sharkSvg, path: sharkPath },
    };
    const entity = ObstacleContainer(
      world,
      entityInfo.label,
      entityInfo.pos,
      entityInfo.size,
      entityInfo.svg
    );

    expect(entity.body.label).toBe(entityInfo.label);
    expect(entity.pos).toEqual(entityInfo.pos);
    expect(entity.svg).toEqual(entityInfo.svg);
  });

  it("ShoutGo presenter collision status render check", () => {
    const prop = {
      currentGameKey: "shoutGo",
      status: "collision",
      chance: 3,
      score: 100,
      decibel: -160,
      running: true,
      setGameEngine: jest.fn(),
      onRetryGame: jest.fn(),
      onGameEvent: jest.fn(),
    };
    const component = render(
      <ShoutGo
        currentGameKey={prop.currentGameKey}
        status={prop.status}
        chance={prop.chance}
        score={prop.score}
        decibel={prop.decibel}
        running={prop.running}
        setGameEngine={prop.setGameEngine}
        onRetryGame={prop.onRetryGame}
        onGameEvent={prop.onGameEvent}
      />
    );

    expect(component.getByText(/계속 도전 하시겠습니까/)).toBeTruthy();
  });

  it("ShoutGo presenter collision status retry button click", () => {
    const prop = {
      currentGameKey: "shoutGo",
      status: "collision",
      chance: 3,
      score: 100,
      decibel: -160,
      running: true,
      setGameEngine: jest.fn(),
      onRetryGame: jest.fn(),
      onGameEvent: jest.fn(),
    };
    const component = render(
      <ShoutGo
        currentGameKey={prop.currentGameKey}
        status={prop.status}
        chance={prop.chance}
        score={prop.score}
        decibel={prop.decibel}
        running={prop.running}
        setGameEngine={prop.setGameEngine}
        onRetryGame={prop.onRetryGame}
        onGameEvent={prop.onGameEvent}
      />
    );

    const retryButton = component.getByText("도전하기");
    fireEvent.press(retryButton);

    expect(prop.onRetryGame).toHaveBeenCalled();
  });

  it("ShoutGo presenter end status render check", () => {
    const prop = {
      currentGameKey: "shoutGo",
      status: "end",
      chance: 3,
      score: 100,
      decibel: -160,
      running: true,
      setGameEngine: jest.fn(),
      onRetryGame: jest.fn(),
      onGameEvent: jest.fn(),
    };
    const component = render(
      <GameContextProvider>
        <ShoutGo
          currentGameKey={prop.currentGameKey}
          status={prop.status}
          chance={prop.chance}
          score={prop.score}
          decibel={prop.decibel}
          running={prop.running}
          setGameEngine={prop.setGameEngine}
          onRetryGame={prop.onRetryGame}
          onGameEvent={prop.onGameEvent}
        />
      </GameContextProvider>
    );

    expect(component.getByText("등록")).toBeTruthy();
    expect(component.toJSON).toMatchSnapshot();
    expect(component.toJSON).toBeTruthy();
  });

  it("ShoutGo presenter play status render check and onGameEvent call", () => {
    const prop = {
      currentGameKey: "shoutGo",
      status: "resultPlay",
      chance: 3,
      score: 100,
      decibel: -160,
      running: true,
      setGameEngine: jest.fn(),
      onRetryGame: jest.fn(),
      onGameEvent: jest.fn(),
    };
    const component = render(
      <GameContextProvider>
        <ShoutGo
          currentGameKey={prop.currentGameKey}
          status={prop.status}
          chance={prop.chance}
          score={prop.score}
          decibel={prop.decibel}
          running={prop.running}
          setGameEngine={prop.setGameEngine}
          onRetryGame={prop.onRetryGame}
          onGameEvent={prop.onGameEvent}
        />
      </GameContextProvider>
    );

    expect(component.getByTestId("backgroundImage")).toBeTruthy();
    expect(component.getByTestId("gameLayout")).toBeTruthy();
    waitFor(() => {
      expect(prop.onGameEvent).toHaveBeenCalled();
    });
  });

  it("Timer presenter grandted status render check", async () => {
    const mockOnOpenSettingOption = jest.fn();
    const mockOnSetStatusPlay = jest.fn();

    const component = render(
      <Timer
        micPermission="granted"
        onOpenSettingOption={mockOnOpenSettingOption}
        onSetStatusPlay={mockOnSetStatusPlay}
      />
    );

    expect(component.getByTestId("timer")).toBeTruthy();
  });

  it("Timer presenter blocked status render check", async () => {
    const mockOnOpenSettingOption = jest.fn();
    const mockOnSetStatusPlay = jest.fn();

    const component = render(
      <Timer
        micPermission="blocked"
        onOpenSettingOption={mockOnOpenSettingOption}
        onSetStatusPlay={mockOnSetStatusPlay}
      />
    );

    expect(await component.findByText(/권한 승인이 필요 합니다/)).toBeTruthy();
  });
});
