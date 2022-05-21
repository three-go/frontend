import React from "react";
import { render } from "@testing-library/react-native";
import "@testing-library/react-native";
import { Text } from "react-native";
import ButtonModal from "../src/components/Modals/ButtonModal";

it("ButtonModal should render correctly", () => {
  const component = render(
    <ButtonModal content="test" isVisible={true}>
      <Text />
    </ButtonModal>
  );

  expect(component).toBeTruthy();
  expect(component).toMatchSnapshot();

  const { getByText } = render(
    <ButtonModal content="test" isVisible={false}>
      <Text />
    </ButtonModal>
  );

  expect(() => getByText(/test/i)).toThrow(
    "Unable to find an element with text: /test/i"
  );
});

it("ButtonModal should render content text", () => {
  const { getByText, toJSON } = render(
    <ButtonModal content="test" isVisible={true}>
      <Text />
    </ButtonModal>
  );
  const buttonModal = toJSON();

  expect(getByText(/test/i)).toHaveTextContent("test");
  expect(buttonModal).toBeTruthy();
  expect(buttonModal).toMatchSnapshot();
});

it("ButtonModal should render children correctly", () => {
  const { getByText, toJSON } = render(
    <ButtonModal content="test" isVisible={true}>
      <Text>children rendered</Text>
    </ButtonModal>
  );
  const buttonModal = toJSON();

  expect(getByText(/children rendered/i)).toHaveTextContent(
    "children rendered"
  );
  expect(buttonModal).toBeTruthy();
  expect(buttonModal).toMatchSnapshot();
});
