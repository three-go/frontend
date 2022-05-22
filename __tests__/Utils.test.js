import React from "react";

import "@testing-library/jest-native";
import "react-native-gesture-handler/jestSetup";
import { Dimensions } from "react-native";

import { colors, audio } from "../src/common/constants";
import {
  setItemToAsync,
  getItemFromAsync,
} from "../src/utils/asyncStorageHelper";
import {
  convertContentToArray,
  descendOrderArray,
  startVibrate,
  isStartOrEndCell,
  getBackgroundColor,
  getSound,
} from "../src/utils/helper";
import { createMap } from "../src/utils/map";
import { getObstacleSizePos } from "../src/utils/random";

jest.mock("react-native-sound", () => {
  const Sound = () => {
    const obj = {};
    obj.sound = "music";
    obj.setNumberOfLoops = jest.fn();
    obj.play = jest.fn();
    obj.stop = jest.fn();
    return obj;
  };
  return Sound;
});

const mockVibrate = jest.fn();
jest.mock("react-native/Libraries/Vibration/Vibration", () => ({
  vibrate: mockVibrate,
}));

const mockSetItem = jest.fn();
const mockGetItem = jest.fn();
jest.mock("@react-native-community/async-storage", () => {
  const Storage = {
    default: {
      setItem: mockSetItem,
      getItem: mockGetItem,
    },
  };
  return Storage;
});

describe("Utils Test", () => {
  it("AsyncStorage Test", () => {
    let setError;
    let getError;

    try {
      setItemToAsync();
    } catch (error) {
      setError = error;
    }

    try {
      getItemFromAsync();
    } catch (error) {
      getError = error;
    }

    expect(setError.message).toBe("Storage Name is empty");
    expect(getError.message).toBe("Storage Name is empty");
    expect(mockSetItem).not.toHaveBeenCalled();
    expect(mockGetItem).not.toHaveBeenCalled();
  });

  it("getSound Test", () => {
    const result = getSound(audio.timer);

    expect(typeof result.play).toBe("function");
    expect(typeof result.stop).toBe("function");
  });

  it("getBackgroundColor Test", () => {
    let rowIndex = 0;
    let cellIndex = 0;
    const endRowIndex = 3;
    const endCellIndex = 2;
    let canPass = true;

    const colorA = getBackgroundColor(
      rowIndex,
      cellIndex,
      endRowIndex,
      endCellIndex,
      canPass
    );

    expect(colorA).toBe(colors.green);

    rowIndex = 1;
    cellIndex = 1;
    const colorB = getBackgroundColor(
      rowIndex,
      cellIndex,
      endRowIndex,
      endCellIndex,
      canPass
    );

    expect(colorB).toBe(colors.lightBlue);

    canPass = false;
    const colorC = getBackgroundColor(
      rowIndex,
      cellIndex,
      endRowIndex,
      endCellIndex,
      canPass
    );

    expect(colorC).toBe(colors.blueGray);
  });

  it("isStartOrEndCell Test", () => {
    let rowIndex = 0;
    let cellIndex = 0;
    const endRowIndex = 3;
    const endCellIndex = 2;
    const resultA = isStartOrEndCell(
      rowIndex,
      cellIndex,
      endRowIndex,
      endCellIndex
    );

    expect(resultA).toBe(true);

    rowIndex = 3;
    cellIndex = 2;
    const resultB = isStartOrEndCell(
      rowIndex,
      cellIndex,
      endRowIndex,
      endCellIndex
    );

    expect(resultB).toBe(true);

    rowIndex = 1;
    cellIndex = 1;
    const resultC = isStartOrEndCell(
      rowIndex,
      cellIndex,
      endRowIndex,
      endCellIndex
    );

    expect(resultC).toBe(false);
  });

  it("startVibrate Test", () => {
    startVibrate();

    expect(mockVibrate).toHaveBeenCalled();
  });

  it("descendOrderArray Test", () => {
    const scores = [
      { name: "Han", score: 5 },
      { name: "Tom", score: 1 },
      { name: "Anna", score: 10 },
      { name: "John", score: 6 },
      { name: "Ken", score: 9 },
      { name: "Jordan", score: 4 },
    ];
    const key = "score";
    const results = descendOrderArray(scores, key);

    expect(results[0].name).toBe("Anna");
    expect(results[results.length - 1].name).toBe("Tom");
  });

  it("convertContentToArray", () => {
    const obj = {
      contentA: "content...A",
      contentB: "content...B",
      contentC: "content...C",
    };
    const keys = ["contentA", "contentB"];
    const result = convertContentToArray(obj, keys);

    expect(result.length).toBe(2);
  });

  it("createMap Test", () => {
    const stage1Map = createMap(1);
    const stage2Map = createMap(2);
    const stage3Map = createMap(3);
    const invalidStage = createMap(4);

    expect(Array.isArray(stage1Map)).toBe(true);
    expect(stage1Map.length).toBe(4);
    expect(stage2Map.length).toBe(5);
    expect(stage3Map.length).toBe(6);
    expect(invalidStage).toBe("Invalid Stage Value");
  });

  it("getObstacleSizePos", () => {
    const addToPosX = 0;
    const obstacle = getObstacleSizePos(addToPosX);
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    expect(obstacle.size.width).toBe(140);
    expect(obstacle.size.height).toBe(70);
    expect(obstacle.pos.x).toBe(addToPosX + windowWidth);
    expect(obstacle.pos.y - windowHeight < 700).toBe(true);
  });
});
