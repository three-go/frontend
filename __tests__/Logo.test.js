import React from "react";
import { render } from "@testing-library/react-native";
import "@testing-library/react-native";
import Logo from "../src/components/Logo";

const styles = {
  sm: { width: 100, height: 80 },
  md: { width: 140, height: 100 },
  lg: { width: 240, height: 160 },
};

it("Logo size test(sm)", () => {
  const { toJSON } = render(<Logo size="sm" />);
  const { style } = toJSON().props;

  expect(styles.sm).toEqual(style);
});

it("Logo size test(md)", () => {
  const { toJSON } = render(<Logo size="md" />);
  const { style } = toJSON().props;

  expect(styles.md).toEqual(style);
});

it("Logo size test(lg)", () => {
  const { toJSON } = render(<Logo size="lg" />);
  const { style } = toJSON().props;

  expect(styles.lg).toEqual(style);
});
