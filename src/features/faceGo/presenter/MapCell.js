import React from "react";

import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../../../common";

const MapCell = ({ width, height, bgColor, canMove }) => {
  return (
    <>
      {canMove && <View style={styles.cell(width, height, bgColor)} />}
      {!canMove && (
        <View style={styles.cell(width, height, bgColor)}>
          <Icon name="close" size={width} color={colors.ligthGray} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cell: (width, height, bgColor) => {
    return {
      justifyContent: "center",
      alignItems: "center",
      width,
      height,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.white,
      backgroundColor: bgColor,
    };
  },
});

export default React.memo(MapCell);
