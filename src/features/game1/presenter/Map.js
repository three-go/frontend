import React, { useState, useEffect } from "react";

import { FlatList, View, Text, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import useCharacter from "../../../hooks/useCharacter";

// constant로 관리해야할 값
const FIXED_WIDTH = 300;
const FIXED_HEIGHT = 450;

// map 만들기 함수 실행 후 가져올 값
const GAME_MAP = [
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1],
];

const Item = ({ opened, width, height }) => (
  <View
    style={{
      width,
      height,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#ffffff",
      backgroundColor: opened ? "#f9c2ff" : "#a3a1dd",
    }}
  ></View>
);

const FixedItem = ({ width, height, fixedBgColor }) => (
  <View
    style={{
      width,
      height,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#ffffff",
      backgroundColor: fixedBgColor,
    }}
  ></View>
);

const Map = () => {
  const chracterDetail = useCharacter(GAME_MAP);
  const columnCount = GAME_MAP[0].length;
  const rowCount = GAME_MAP.length;
  const boxWidth = FIXED_WIDTH / columnCount;
  const boxHeigth = FIXED_HEIGHT / rowCount;

  // 움직임 테스트용 데이터
  const testDirection = ["down", "down", "down", "right", "right"];
  const [testIndex, setTestIndex] = useState(0);

  const handleMoveCharacter = () => {
    switch (testDirection[testIndex]) {
      case "left":
        chracterDetail.moveLeft();
        break;
      case "right":
        chracterDetail.moveRight();
        break;
      case "up":
        chracterDetail.moveUp();
        break;
      case "down":
        chracterDetail.moveDown();
        break;
    }

    // 움직임 테스트용 로직
    setTestIndex(testIndex + 1);
  };

  return (
    <View style={styles.container}>
      {GAME_MAP.map((line, rowIndex) => (
        <FlatList
          key={rowIndex}
          data={line}
          renderItem={({ item, index }) => {
            if (
              isStartOrEndCell(rowIndex, index, rowCount - 1, columnCount - 1)
            ) {
              return (
                <FixedItem
                  width={boxWidth}
                  height={boxHeigth}
                  fixedBgColor="#525281"
                />
              );
            }
            return <Item opened={item} width={boxWidth} height={boxHeigth} />;
          }}
          keyExtractor={(item, index) => index}
          numColumns={columnCount}
        />
      ))}
      <View
        style={styles.chracterBox(
          boxWidth,
          boxHeigth,
          boxHeigth * chracterDetail.position.y,
          boxWidth * chracterDetail.position.x
        )}
      >
        <Icon name="heart" size={50} color="#f45a5a" style={{ zIndex: 1 }} />
      </View>
      <View style={styles.startText}>
        <Text title="start" />
      </View>
      {/*움직임 테스트용 컴포넌트*/}
      <View style={styles.chracterBox}>
        <Button title="test" onPress={handleMoveCharacter} />
      </View>
      <View style={styles.startText}>
        <Text style={{ color: "#a3a1dd" }}>start</Text>
      </View>
      <View style={styles.endText}>
        <Text style={{ color: "#a3a1dd" }}>end</Text>
      </View>
    </View>
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

export default Map;
