import React from "react";

import { FlatList, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../../../common";

const DefaultMap = ({ gameMap, arrInfo, boxStyle }) => {
  return (
    <View style={styles.container}>
      {gameMap &&
        gameMap.map((line, rowIndex) => (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            key={rowIndex}
            data={line}
            renderItem={({ item, index }) => {
              const bgColor = getBackgroundColor(
                rowIndex,
                index,
                arrInfo.rowCount - 1,
                arrInfo.columnCount - 1,
                Boolean(item)
              );

              return createCell(
                boxStyle.boxWidth,
                boxStyle.boxHeigth,
                bgColor,
                Boolean(item)
              );
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

const getBackgroundColor = (
  rowIndex,
  cellIndex,
  lastRowIndex,
  lastCellIndex,
  canPass
) => {
  let bgColor;

  if (isStartOrEndCell(rowIndex, cellIndex, lastRowIndex, lastCellIndex)) {
    bgColor = colors.green;
  } else {
    bgColor = canPass ? colors.lightBlue : colors.blueGray;
  }

  return bgColor;
};

const createCell = (width, height, bgColor, canPass) => {
  if (!canPass) {
    return (
      <View style={styles.cell(width, height, bgColor)}>
        <Icon name="close" size={width} color={colors.ligthGray} />
      </View>
    );
  }

  return <View style={styles.cell(width, height, bgColor)} />;
};

const isStartOrEndCell = (rowIndex, cellIndex, endRowIndex, endCellIndex) => {
  if (rowIndex === 0 && cellIndex === 0) {
    return true;
  }

  if (rowIndex === endRowIndex && cellIndex === endCellIndex) {
    return true;
  }

  return false;
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
