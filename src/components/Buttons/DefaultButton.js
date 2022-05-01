import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { colors } from "../../common";

const DefaultButton = ({ content, color, onPress }) => (
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
      width: 150,
      height: 40,
      backgroundColor: bgColor,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  text: {
    padding: 8,
    color: colors.ivory,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default DefaultButton;

DefaultButton.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

DefaultButton.defaultProps = {
  content: "Click",
  color: colors.green,
  onPress: () => {},
};
