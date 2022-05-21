import React from "react";
import { render } from "@testing-library/react-native";
import "@testing-library/react-native";
import ChanceIcons from "../src/components/ChanceIcons";

const getRandomChanceCount = () => {
  return Math.floor(Math.random() * 4);
};

const getChanceIconsId = (rest) => {
  const MAX_CHANCE = 3;
  const BROKEN_HEART = "heart-broken-outline";
  const HEART = "heart";
  const result = [];

  for (let i = 0; i < MAX_CHANCE; i++) {
    if (rest > 0) {
      result.push(HEART);
      rest--;
    } else {
      result.push(BROKEN_HEART);
    }
  }

  return result;
};

it("Component must have 3 chance icons.", () => {
  const chanceCount = 3;
  const { queryAllByTestId, toJSON } = render(
    <ChanceIcons chance={chanceCount} />
  );
  const chanceIcons = toJSON();

  expect(queryAllByTestId("heart").length).toBe(chanceCount);
  expect(chanceIcons).toMatchSnapshot();
  expect(chanceIcons).toBeTruthy();
});

it("The icon should change according to the number of chance remaining.", () => {
  const chanceCount = getRandomChanceCount();
  const expectedResult = getChanceIconsId(chanceCount);
  const { toJSON } = render(<ChanceIcons chance={chanceCount} />);
  const children = toJSON().children;

  for (let i = 0; i < 3; i++) {
    expect(children[i].props.testID).toBe(expectedResult[i]);
  }
});
