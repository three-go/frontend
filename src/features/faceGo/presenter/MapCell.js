import React from "react";

import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../../../common/constants";

const MapCell = ({ width, height, bgColor, canMove }) => {
  return (
    <>
      {canMove && (
        <View style={styles.cell(width, height, bgColor)} testID="possible" />
      )}
      {!canMove && (
        <View style={styles.cell(width, height, bgColor)} testID="impossible">
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

MapCell.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  bgColor: PropTypes.string.isRequired,
  canMove: PropTypes.bool.isRequired,
};
