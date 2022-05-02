import React from "react";

import Matter from "matter-js";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { SvgCss } from "react-native-svg";

const Obstacle = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <SvgCss
      xml={props.svg.xml}
      width={props.size.width}
      height={props.size.height}
      style={styles.container(xBody, yBody)}
    />
  );
};

const styles = StyleSheet.create({
  container: (x, y) => {
    return {
      position: "absolute",
      left: x,
      top: y,
    };
  },
});

const ObstacleContainer = (world, label, pos, size, svg) => {
  const vertices = Matter.Vertices.fromPath(svg.path);
  const obstacle = Matter.Bodies.fromVertices(pos.x, pos.y, vertices, {
    label,
    isStatic: true,
  });

  Matter.World.add(world, obstacle);

  return {
    body: obstacle,
    pos,
    size,
    svg,
    renderer: <Obstacle />,
  };
};

export default ObstacleContainer;

Obstacle.propTypes = {
  body: PropTypes.object,
  color: PropTypes.string,
  layout: PropTypes.object,
  pos: PropTypes.object,
  size: PropTypes.object,
  renderer: PropTypes.node,
  screen: PropTypes.object,
  svg: PropTypes.object,
};
