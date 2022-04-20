import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

/*
[ 사용법 예시(컴포넌트 호출) ]

<SmallButton
  content="small"
  color="salmon"
  onPress={() => {
    console.log("s");
  }}
/>
*/
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
      width: 80,
      height: 40,
      backgroundColor: bgColor,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  text: {
    padding: 8,
    color: "#f8f9fa",
    fontSize: 12,
  },
});

export default SmallButton;
