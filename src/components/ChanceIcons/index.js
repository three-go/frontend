import React from "react";

import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../../common/property";
import { iconNames } from "../../common/constants";

const ChanceIcons = ({ chance }) => {
  const defaultChance = 3;

  return (
    <View style={styles.heartWrapper}>
      {createChanceIcons(defaultChance, chance).map((iconName, index) => (
        <Icon key={index} name={iconName} size={28} color={colors.red} />
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
      result.push(iconNames.heart);
    } else {
      result.push(iconNames.brokenHeart);
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
