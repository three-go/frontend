import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";

const TextTimer = () => {
  // 전역 상태관리에서 text 및 count 불러오기 추가 필요
  const [guideContent, setGuideContent] = useState("맵 숨겨지기");
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (count === 0) {
        return;
      }

      setCount(count - 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [count]);

  return (
    <Text>
      {guideContent} <Text style={styles.number}>{count}</Text> 초 전
    </Text>
  );
};

const styles = StyleSheet.create({
  number: {
    fontSize: 18,
    color: "#525281",
  },
});

export default TextTimer;
