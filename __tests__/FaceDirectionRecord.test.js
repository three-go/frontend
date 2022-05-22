import React from "react";

import { render } from "@testing-library/react-native";

import { game } from "../src/common/property";
import { colors } from "../src/common/constants";
import FaceDirectionRecord from "../src/features/faceGo/presenter/FaceDirectionRecord";

jest.mock("react-native-sound", () => {
  const Sound = () => {
    const obj = {};
    obj.sound = "music";
    return obj;
  };

  return Sound;
});

const props = {
  status: game.status.open,
  directions: [
    { id: "id1", direction: "right" },
    { id: "id2", direction: "right" },
    { id: "id3", direction: "down" },
    { id: "id4", direction: "down" },
    { id: "id5", direction: "down" },
  ],
};

it("The arrow icon should be rendered to match the directions.", () => {
  const { toJSON } = render(<FaceDirectionRecord {...props} />);

  for (let i = 0; i < 5; i++) {
    const arrowIcon = toJSON().children[0].children[0].children[i].children[0];

    expect(arrowIcon.props.testID).toBe(
      `arrow${props.directions[i].direction}`
    );
  }
});

it("The first arrow icon color style should be specific color when game status is 'play'", () => {
  props.status = game.status.play;
  const { toJSON } = render(<FaceDirectionRecord {...props} />);
  const arrowIcon = toJSON().children[0].children[0].children[0].children[0];
  const arrowIconColor = arrowIcon.props.style[0].color;

  expect(arrowIconColor).toBe(colors.turquoise);
});

it("The first arrow icon color style should be specific color when game status is 'directionInput'", () => {
  props.status = game.status.directionInput;
  const { toJSON } = render(<FaceDirectionRecord {...props} />);
  const arrowIcon = toJSON().children[0].children[0].children[4].children[0];
  const arrowIconColor = arrowIcon.props.style[0].color;

  expect(arrowIconColor).toBe(colors.turquoise);
});
