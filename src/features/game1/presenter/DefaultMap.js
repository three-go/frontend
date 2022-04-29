import React from "react";

import { FlatList, View, Text, StyleSheet } from "react-native";

import { colors } from "../../../common";
import { getBackgroundColor } from "../../../utils/helper";
import { MapCell } from "..";

const DefaultMap = ({ gameMap, arrInfo, boxStyle }) => {
  const generateMapCell = ({ item, index, rowIndex }) => {
    const bgColor = getBackgroundColor(
      rowIndex,
      index,
      arrInfo.rowCount - 1,
      arrInfo.columnCount - 1,
      Boolean(item)
    );

    return (
      <MapCell
        width={boxStyle.boxWidth}
        height={boxStyle.boxHeigth}
        bgColor={bgColor}
        canMove={Boolean(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {gameMap &&
        gameMap.map((value, rowIndex) => (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            key={rowIndex}
            data={value}
            renderItem={({ item, index }) => {
              return generateMapCell({ item, index, rowIndex });
            }}
            keyExtractor={(_, index) => index}
            numColumns={arrInfo.columnCount}
          />
        ))}

      <View style={styles.startText}>
        <Text style={styles.text}>Start</Text>
      </View>
      <View style={styles.endText}>
        <Text style={styles.text}>End</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.ivory,
    backgroundColor: colors.ivory,
  },
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
  chracterBox: (width, height) => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width,
      height,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      zIndex: 0,
    };
  },
  startText: {
    position: "absolute",
    top: 5,
    left: 10,
  },
  endText: {
    position: "absolute",
    bottom: 5,
    right: 15,
  },
  text: {
    fontSize: 16,
    color: colors.ivory,
  },
});

export default React.memo(DefaultMap);
