import React, { useEffect } from "react";

import { Text, StyleSheet } from "react-native";

const TextTimer = ({ setIsFinish, timerInfo, setTimerInfo }) => {
  useEffect(() => {
    let timeoutId;

    if (timerInfo.count > 0) {
      timeoutId = setTimeout(() => {
        setTimerInfo((state) => {
          return {
            ...state,
            count: state.count - 1,
          };
        });
      }, 1000);
    }

    if (timerInfo.count === 0) {
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
      color: "#ffffff",
      fontSize: size ? size : 12,
    };
  },
  number: (size) => {
    return {
      color: "#ffffff",
      fontSize: size ? size * 2 : 18,
    };
  },
});

export default TextTimer;
