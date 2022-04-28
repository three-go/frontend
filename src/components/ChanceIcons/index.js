import React from "react";

import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { iconNames, iconSizes, colors } from "../../common";

const MAX_CHANCE = 3;

const ChanceIcons = ({ chance }) => {
  return (
    <View style={styles.heartWrapper}>
      {createChanceIcons(MAX_CHANCE, chance).map((value, index) => (
        <Icon
          key={index}
          name={value}
          size={iconSizes.headerChance}
          color={colors.red}
        />
      ))}
    </View>
  );
};

const createChanceIcons = (maxChance, restChance) => {
  const result = [];
  let restCount = restChance;

  for (let i = 0; i < maxChance; i++) {
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
