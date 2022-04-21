import React from "react";

import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ChanceIcons = () => {
  // 전역 상태관리에서 defaultChanceCount, resctChanceCount 값 불러오기 추가 필요
  // (전체 시도 가능 횟수, 남은 횟수)
  const defaultChance = 3;
  const restChance = 1;

  return (
    <View style={styles.heartWrapper}>
      {createChanceIcons(defaultChance, restChance).map((iconName, index) => (
        <Icon key={index} name={iconName} size={28} color="#f45a5a" />
      ))}
    </View>
  );
};

const createChanceIcons = (defaultChance, restChance) => {
  const result = [];
  let restCount = restChance;

  for (let i = 0; i < defaultChance; i++) {
    if (restCount > 0) {
      --restCount;
      result.push("heart");
    } else {
      result.push("heart-broken-outline");
    }
  }

  return result;
};

const styles = StyleSheet.create({
  heartWrapper: {
    flexDirection: "row",
  },
});

export default ChanceIcons;
