import { Vibration } from "react-native";

import { colors } from "../common";

export const convertContentToArray = (object, keyList) => {
  const result = [];

  keyList.forEach((key) => {
    const value = object[key];

    if (value) {
      result.push(object[key]);
    } else {
      result.push([]);
    }
  });

  return result;
};

export const descendOrderArray = (array, key) => {
  return array.sort((a, b) => {
    return b[key] - a[key];
  });
};

export const startVibrate = () => {
  Vibration.vibrate();
};

export const isStartOrEndCell = (
  rowIndex,
  cellIndex,
  endRowIndex,
  endCellIndex
) => {
  if (rowIndex === 0 && cellIndex === 0) {
    return true;
  }

  if (rowIndex === endRowIndex && cellIndex === endCellIndex) {
    return true;
  }

  return false;
};

export const getBackgroundColor = (
  rowIndex,
  cellIndex,
  lastRowIndex,
  lastCellIndex,
  canPass
) => {
  let bgColor;

  if (isStartOrEndCell(rowIndex, cellIndex, lastRowIndex, lastCellIndex)) {
    bgColor = colors.green;
  } else {
    bgColor = canPass ? colors.lightBlue : colors.blueGray;
  }

  return bgColor;
};
