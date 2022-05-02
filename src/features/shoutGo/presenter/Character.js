import React from "react";

import Matter from "matter-js";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { SvgCss, SvgXml } from "react-native-svg";

const Character = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <SvgXml
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
      top: y + 10,
    };
  },
});

const CharacterContainer = (world, pos, size, svg) => {
  const character = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Character" }
  );

  Matter.Composite.add(world, character);

  return {
    body: character,
    pos,
    size,
    svg,
    renderer: <Character />,
  };
};

export default CharacterContainer;

Character.propTypes = {
  body: PropTypes.object,
  color: PropTypes.string,
  layout: PropTypes.object,
  pos: PropTypes.object,
  size: PropTypes.object,
  renderer: PropTypes.node,
  screen: PropTypes.object,
  svg: PropTypes.object,
};
