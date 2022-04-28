import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { colors } from "../../common/property";

const SmallButton = ({ content, color, onPress }) => (
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
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: 40,
      borderRadius: 20,
      backgroundColor: bgColor,
    };
  },
  text: {
    padding: 8,
    color: colors.ivory,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default SmallButton;
