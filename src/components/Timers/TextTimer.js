import React, { useEffect } from "react";

import { Text, StyleSheet } from "react-native";

import { colors, time } from "../../common";

const TextTimer = ({ setIsFinish, timerInfo, setTimerInfo }) => {
  useEffect(() => {
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
      setIsFinish(true);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timerInfo, setTimerInfo, setIsFinish]);

  return (
    <Text style={styles.text(timerInfo.size)}>
      {timerInfo.text}
      <Text style={styles.number(timerInfo.size)}>{timerInfo.count}</Text>초 전
    </Text>
  );
};

const styles = StyleSheet.create({
  text: (size) => {
    return {
      color: colors.ivory,
      fontSize: size ? size : 12,
    };
  },
  number: (size) => {
    return {
      color: colors.ivory,
      fontSize: size ? size * 2 : 18,
    };
  },
});

export default TextTimer;
