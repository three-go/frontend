import React, { useRef, useEffect } from "react";

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Map = ({ gameMap, characterInfo, arrInfo, boxStyle, onMove }) => {
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
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [characterInfo.position.x, characterInfo.position.y]);

  return (
    <View style={styles.container}>
      {/* 게임 맵 view */}
      {gameMap.map((line, rowIndex) => (
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

            return createCell(boxStyle.boxWidth, boxStyle.boxHeigth, bgColor);
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
        <Icon name="heart" size={50} color="#f45a5a" style={{ zIndex: 1 }} />
      </Animated.View>

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
  chracterBox: (width, height) => {
    return {
      position: "absolute",
      width,
      height,
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
