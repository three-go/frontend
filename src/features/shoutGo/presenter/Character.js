import React from "react";

import Matter from "matter-js";
import { View, StyleSheet } from "react-native";

const Character = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;
  const color = props.color;

  return (
    <View
      style={styles.container(color, xBody, yBody, widthBody, heightBody)}
    />
  );
};

const styles = StyleSheet.create({
  container: (color, x, y, w, h) => {
    return {
      borderWidth: 1,
      borderColor: color,
      borderStyle: "solid",
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
    };
  },
});

const CharacterContainer = (world, color, pos, size) => {
  const character = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Submarine" }
  );

  Matter.Composite.add(world, character);

  return {
    body: character,
    color,
    pos,
    renderer: <Character />,
  };
};

export default CharacterContainer;
