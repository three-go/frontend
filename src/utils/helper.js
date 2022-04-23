import { Vibration } from "react-native";

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
