import React, { useRef, useEffect } from "react";

import { FlatList, View, Text, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Map = ({ gameMap, characterInfo, arrInfo, boxStyle, directions }) => {
  const animation = useRef(
    new Animated.ValueXY({
      x: boxStyle.boxWidth * characterInfo.position.x,
      y: boxStyle.boxHeigth * characterInfo.position.y,
    })
  ).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: {
        x: boxStyle.boxWidth * characterInfo.position.x,
        y: boxStyle.boxHeigth * characterInfo.position.y,
      },
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [characterInfo.position.x, characterInfo.position.y]);

  return (
    <View style={styles.container}>
      {/* 게임 맵 view */}
      {gameMap &&
        gameMap.map((line, rowIndex) => (
          <FlatList
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

      {/* 캐릭터 이동 view */}
      <Animated.View
        style={[
          styles.chracterBox(boxStyle.boxWidth, boxStyle.boxHeigth),
          {
            transform: [
              {
                translateX: animation.x,
              },
              {
                translateY: animation.y,
              },
            ],
          },
        ]}
      >
        <Icon name="heart" size={50} color="#f45a5a" style={{ zIndex: 2 }} />
      </Animated.View>

      {/* start marker view */}
      <View style={styles.startText}>
        <Text style={{ fontSize: 16, color: "#FCF8F6" }}>Start</Text>
      </View>
      {/* end marker view */}
      <View style={styles.endText}>
        <Text style={{ fontSize: 16, color: "#FCF8F6" }}>End</Text>
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
    bgColor = "#21D0B2";
  } else {
    bgColor = canPass ? "#5fceec" : "#2F455C";
  }

  return bgColor;
};

// UI 그리기(스타일 지정) 헬퍼 함수
const createCell = (width, height, bgColor, canPass) => {
  if (!canPass) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width,
          height,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#ffffff",
          backgroundColor: bgColor,
        }}
      >
        <Icon name="close" size={width} color="#5c6977" />
      </View>
    );
  }

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
  chracterBox: (width, height) => {
    return {
      position: "absolute",
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
});

export default React.memo(Map);
