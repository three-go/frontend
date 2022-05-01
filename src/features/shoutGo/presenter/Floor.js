import React from "react";

import Matter from "matter-js";
import { View, StyleSheet } from "react-native";

const Floor = (props) => {
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
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      backgroundColor: color,
    };
  },
});

const FloorContainer = (world, color, pos, size) => {
  const floor = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: "Floor",
    isStatic: true,
  });

  Matter.World.add(world, floor);

  return {
    body: floor,
    color,
    pos,
    renderer: <Floor />,
  };
};

export default FloorContainer;
