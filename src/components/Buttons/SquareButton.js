import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { colors } from "../../common";

const SquareButton = ({ content, color, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={styles.container(color)}
    onPress={onPress}
  >
    <Text style={styles.text}>{content}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: (bgColor) => {
    return {
      width: 120,
      height: 120,
      backgroundColor: bgColor,
      borderRadius: 4,
      borderWidth: 4,
      borderColor: colors.ivory,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  text: {
    padding: 8,
    color: colors.ivory,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SquareButton;

SquareButton.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

SquareButton.defaultProps = {
  content: "Click",
  color: colors.green,
  onPress: () => {},
};
