import React from "react";

import { FlatList, View, Text, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Map = ({ gameMap, characterInfo, arrInfo, boxStyle, onMove }) => {
  return (
    <View style={styles.container}>
      {/* 게임 맵 view */}
      {gameMap.map((line, rowIndex) => (
        <FlatList
          key={rowIndex}
          data={line}
          renderItem={({ item, index }) => {
            let bgColor = getBackgroundColor(
              rowIndex,
              index,
              arrInfo.rowCount - 1,
              arrInfo.columnCount - 1,
              Boolean(item)
            );

            return createCell(boxStyle.boxWidth, boxStyle.boxHeigth, bgColor);
          }}
          keyExtractor={(_, index) => index}
          numColumns={arrInfo.columnCount}
        />
      ))}

      {/* 캐릭터 이동 view */}
      <View
        style={styles.chracterBox(
          boxStyle.boxWidth,
          boxStyle.boxHeigth,
          boxStyle.boxHeigth * characterInfo.position.y,
          boxStyle.boxWidth * characterInfo.position.x
        )}
      >
        <Icon name="heart" size={50} color="#f45a5a" style={{ zIndex: 1 }} />
      </View>

      {/* start marker view */}
      <View style={styles.startText}>
        <Text style={{ color: "#a3a1dd" }}>start</Text>
      </View>
      {/* end marker view */}
      <View style={styles.endText}>
        <Text style={{ color: "#a3a1dd" }}>end</Text>
      </View>

      {/*움직임 테스트용 컴포넌트*/}
      <View style={styles.chracterBox}>
        <Button title="test" onPress={onMove} />
      </View>
    </View>
  );
};

// UI 그리기(스타일 지정) 헬퍼 함수
const getBackgroundColor = (
  rowIndex,
  cellIndex,
  lastRowIndex,
  lastCellIndex,
  canPass
) => {
  if (isStartOrEndCell(rowIndex, cellIndex, lastRowIndex, lastCellIndex)) {
    bgColor = "#525281";
  } else {
    bgColor = canPass ? "#f9c2ff" : "#a3a1dd";
  }

  return bgColor;
};

// UI 그리기(스타일 지정) 헬퍼 함수
const createCell = (width, height, bgColor) => {
  return (
    <View
      style={{
        width,
        height,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ffffff",
        backgroundColor: bgColor,
      }}
    />
  );
};

// util 함수로 분리 예정
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
    position: "absolute",
    flexWrap: "wrap",
    width: 300,
    height: 450,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  chracterBox: (width, height, top, left) => {
    return {
      position: "absolute",
      width,
      height,
      top,
      left,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 0,
    };
  },
  test: {
    position: "absolute",
    top: -100,
  },
  startText: {
    position: "absolute",
    top: -20,
    left: 10,
  },
  endText: {
    position: "absolute",
    bottom: -20,
    right: 15,
  },
});

export default React.memo(Map);
