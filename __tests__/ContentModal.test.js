import React from "react";
import { render } from "@testing-library/react-native";
import "@testing-library/react-native";
import { Text, View } from "react-native";
import ContentModal from "../src/components/Modals/ContentModal";

jest.mock("react-native-sound", () => {
  const Sound = () => {
    const obj = {};
    obj.sound = "music";
    return obj;
  };
  return Sound;
});

const mockData = {
  title: "test title",
  content: [
    { title: "Title1", description: "description1" },
    { title: "Title2", description: "description2" },
  ],
  handleRenderScoreItem: ({ item }) => {
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

it("ContentModal should render correctly", () => {
  const component = render(
    <ContentModal isVisible={true} {...mockData}>
      <Text>test children</Text>
    </ContentModal>
  );

  expect(component).toBeTruthy();

  const { getByText } = render(
    <ContentModal isVisible={false} {...mockData}>
      <Text>test children</Text>
    </ContentModal>
  );

  expect(() => getByText(mockData.title)).toThrow(
    "Unable to find an element with text: test title"
  );
});

it("ContentModal should render title correctly", () => {
  const { getByText } = render(
    <ContentModal isVisible={true} {...mockData}>
      <Text>test children</Text>
    </ContentModal>
  );

  expect(getByText(/test title/i)).toHaveTextContent("test title");
});

it("ContentModal should have content property", () => {
  const { getByText, toJSON } = render(
    <ContentModal isVisible={true} {...mockData}>
      <Text>test children</Text>
    </ContentModal>
  );
  const carouselJson = toJSON();

  expect(getByText(/Title1/i)).toHaveTextContent("Title1");
  expect(getByText(/Title1/i)).toBeTruthy();
  expect(getByText(/description1/i)).toBeTruthy();
  expect(getByText(/Title2/i)).toBeTruthy();
  expect(getByText(/description2/i)).toBeTruthy();
  expect(carouselJson).toMatchSnapshot();
  expect(carouselJson).toBeTruthy();
});

it("ContentModal should render children correctly", () => {
  const { getByText } = render(
    <ContentModal isVisible={true} {...mockData}>
      <Text>test children</Text>
    </ContentModal>
  );

  expect(getByText(/test children/i)).toHaveTextContent("test children");
});
