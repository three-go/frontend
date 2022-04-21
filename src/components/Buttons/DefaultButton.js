import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

/*
[ 사용법 예시(컴포넌트 호출) ]

<DefaultButton
  content="test"
  color="darkgray"
  onPress={() => {
    console.log("test");
  }}
/>
*/
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
    color: "#FCF8F6",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default DefaultButton;
