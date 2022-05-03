import React, { useEffect } from "react";

import PropTypes from "prop-types";
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

import { colors } from "../../../common/constants";
import { game } from "../../../common/property";
import { getBackgroundColor, startVibrate } from "../../../utils/helper";
import MapCell from "./MapCell";

const Map = ({
  status,
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

  useEffect(() => {
    const wrongColor = colors.red;
    const defaultColor = colors.ivory;

    if (characterInfo && !characterInfo.isValid) {
      startVibrate();
      game.sounds.wrong.play();

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
      if (
        status === game.status.play &&
        !(characterInfo.position.y === 0 && characterInfo.position.x === 0)
      ) {
        game.sounds.move.play();
      }

      traslateX.value = withSpring(
        boxStyle.boxWidth * characterInfo.position.x,
        {
          duration: 1000,
        }
      );

      translateY.value = withSpring(
        boxStyle.boxHeigth * characterInfo.position.y +
          4 * characterInfo.position.y,
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
        gameMap.map((value, rowIndex) => (
          <FlatList
            key={uuid.v4()}
            data={value}
            renderItem={({ item, index }) => {
              return generateMapCell({ item, index, rowIndex });
            }}
            keyExtractor={(_, index) => index}
            numColumns={arrInfo.columnCount}
          />
        ))}

      {status === game.status.play && (
        <Animated.View
          style={[
            styles.chracterBox(boxStyle.boxWidth, boxStyle.boxHeigth),
            transformStyles,
          ]}
        >
          <Icon
            name="heart"
            size={50}
            color={colors.red}
            style={{ zIndex: 2 }}
          />
        </Animated.View>
      )}

      <View style={styles.startText}>
        <Text style={styles.text}>Start</Text>
      </View>
      <View style={styles.endText}>
        <Text style={styles.text}>End</Text>
      </View>
    </Animated.View>
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
    fontSize: 14,
    color: colors.ivory,
  },
});

export default React.memo(Map);

Map.propTypes = {
  status: PropTypes.string.isRequired,
  gameMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  characterInfo: PropTypes.shape({
    isValid: PropTypes.bool,
    minusScore: PropTypes.number,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    moveDown: PropTypes.func,
    moveUp: PropTypes.func,
    moveLeft: PropTypes.func,
    moveRight: PropTypes.func,
  }),
  arrInfo: PropTypes.shape({
    columnCount: PropTypes.number,
    rowCount: PropTypes.number,
  }).isRequired,
  boxStyle: PropTypes.shape({
    boxHeigth: PropTypes.number,
    boxStyle: PropTypes.number,
  }).isRequired,
  directions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      direction: PropTypes.string,
    })
  ),
  setScore: PropTypes.func.isRequired,
};

Map.defaultProps = {
  gameMap: [],
  directions: [],
};
