import React from "react";

import Matter from "matter-js";
import { View, StyleSheet } from "react-native";

const Floor = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return <View style={styles.container(xBody, yBody, widthBody, heightBody)} />;
};

const styles = StyleSheet.create({
  container: (x, y, w, h) => {
    return {
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
    };
  },
});

const FloorContainer = (world, pos, size) => {
  const floor = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: "Floor",
    isStatic: true,
  });

  Matter.World.add(world, floor);

  return {
    body: floor,
    pos,
    renderer: <Floor />,
  };
};

export default FloorContainer;
