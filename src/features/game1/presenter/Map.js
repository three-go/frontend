import React, { useEffect } from "react";

import { FlatList, View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../../../common";

const Map = ({
  gameMap,
  characterInfo,
  arrInfo,
  boxStyle,
  directions,
  setScore,
}) => {
  const traslateX = useSharedValue(
    boxStyle.boxWidth * characterInfo.position.x
  );
  const translateY = useSharedValue(
    boxStyle.boxHeigth * characterInfo.position.y
  );
  const rotation = useSharedValue(0);
  const borderColor = useSharedValue(colors.ivory);

  const transformStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: traslateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  const backgroundInterpolate = useAnimatedStyle(
    () => ({
      borderColor: borderColor.value,
    }),
    []
  );

  useEffect(() => {
    const wrongColor = colors.red;
    const defaultColor = colors.ivory;

    if (characterInfo && !characterInfo.isValid) {
      borderColor.value = withSequence(
        withTiming(wrongColor, { duration: 500 }),
        withTiming(defaultColor, { duration: 500 })
      );

      rotation.value = withRepeat(
        withTiming(3, {
          duration: 250,
        }),
        4,
        true
      );
    } else {
      traslateX.value = withSpring(
        boxStyle.boxWidth * characterInfo.position.x,
        {
          duration: 1000,
        }
      );

      translateY.value = withSpring(
        boxStyle.boxHeigth * characterInfo.position.y,
        { duration: 1000 }
      );
    }

    characterInfo.minusScore > 0 &&
      setScore((prev) => prev - characterInfo.minusScore);

    return () => {
      borderColor.value = defaultColor;
      rotation.value = 0;
    };
  }, [directions.length]);

  return (
    <Animated.View
      style={[styles.container, rotateStyle, backgroundInterpolate]}
    >
      {gameMap &&
        gameMap.map((line, rowIndex) => (
          <FlatList
            key={uuid.v4()}
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
          transformStyles,
        ]}
      >
        <Icon name="heart" size={50} color={colors.red} style={{ zIndex: 2 }} />
      </Animated.View>

      {/* start marker view */}
      <View style={styles.startText}>
        <Text style={styles.text}>Start</Text>
      </View>
      {/* end marker view */}
      <View style={styles.endText}>
        <Text style={styles.text}>End</Text>
      </View>
    </Animated.View>
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
  let bgColor;

  if (isStartOrEndCell(rowIndex, cellIndex, lastRowIndex, lastCellIndex)) {
    bgColor = colors.green;
  } else {
    bgColor = canPass ? colors.lightBlue : colors.blueGray;
  }

  return bgColor;
};

// UI 그리기(스타일 지정) 헬퍼 함수
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
      borderColor: colors.ivory,
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

export default React.memo(Map);
