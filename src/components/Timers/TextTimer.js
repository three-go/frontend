import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { colors, textSizes, time } from "../../common/constants";
import { game } from "../../common/property";

const TextTimer = ({ onTimerEnd, status }) => {
  const [timerInfo, setTimerInfo] = useState(null);

  const handleTimerInfo = (status) => {
    switch (status) {
      case game.status.none:
        setTimerInfo({
          text: "게임시작",
          // count: time.readyTimerSet,
          count: 1,
          size: textSizes.medium,
        });
        break;
      case game.status.open:
        setTimerInfo({
          text: "맵이 가려지기",
          // count: time.startTimerSet,
          count: 1,
          size: textSizes.small,
        });
        break;
      case game.status.directionInput:
        setTimerInfo({
          text: "입력이 종료되기",
          // count: time.inputTimerSet,
          count: 1,
          size: textSizes.small,
        });
    }
  };

  const handleTimer = () => {
    if (!timerInfo) return;

    let timeoutId;

    if (timerInfo.count > time.zero) {
      timeoutId = setTimeout(() => {
        setTimerInfo((state) => {
          return {
            ...state,
            count: state.count - 1,
          };
        });
      }, time.textTimerInterval);
    }

    if (timerInfo.count === time.zero) {
      onTimerEnd();
    }

    return timeoutId;
  };

  useEffect(() => {
    handleTimerInfo(status);
  }, [status]);

  useEffect(() => {
    const timeoutId = handleTimer();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timerInfo, onTimerEnd, status]);

  return (
    <View style={styles.container}>
      <Text style={styles.text(timerInfo?.size)}>
        {timerInfo?.text}
        <Text style={styles.number(timerInfo?.size)}>{timerInfo?.count}</Text>초
        전
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 8,
    alignItems: "center",
  },
  text: (size) => {
    return {
      color: colors.ivory,
      fontSize: size ? size : 10,
    };
  },
  number: (size) => {
    return {
      color: colors.ivory,
      fontSize: size ? size * 2 : 16,
    };
  },
});

export default React.memo(TextTimer);

TextTimer.propTypes = {
  onTimerEnd: PropTypes.func,
  status: PropTypes.string,
};
