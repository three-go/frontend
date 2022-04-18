import React from "react";

import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";

/*
[ 사용법 예시(컴포넌트 호출) ]

<Logo size="lg" />
( size: [sm, md, lg] )
*/
const Logo = ({ size }) => (
  <Image
    source={require("../../assets/logo.png")}
    style={styles.container(size)}
    resizeMode="contain"
  />
);

const styles = StyleSheet.create({
  container: (size) => {
    switch (size) {
      case "sm":
        return {
          width: 100,
          height: 80,
        };
      case "md":
        return {
          width: 140,
          height: 100,
        };
      case "lg":
        return {
          width: 240,
          height: 160,
        };
      default:
        return {
          width: 120,
          height: 100,
        };
    }
  },
});

export default Logo;
