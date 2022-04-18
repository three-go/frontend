import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

/*
[ 사용법 예시(컴포넌트 호출) ]

<SquareButton
  content="squre"
  color="orange"
  onPress={() => {
    console.log("squre test");
  }}
/>
*/
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
      width: 100,
      height: 100,
      backgroundColor: bgColor,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  text: {
    padding: 8,
    color: "#ffffff",
  },
});

export default SquareButton;
