import React from "react";

import { Text, View, StyleSheet } from "react-native";

import { ChanceIcons, SmallButton, TextTimer } from "../index";

const GameHeader = ({
  onPressBack,
  isReady,
  isStart,
  setIsStart,
  isInput,
  setIsInput,
  startTimer,
  setStartTimer,
  inputTimer,
  setInputTimer,
}) => {
  return (
    <View>
      {isReady && (
        <View
          style={isReady ? styles.container(true) : styles.container(false)}
        >
          <SmallButton
            content="뒤로 가기"
            color="#525281"
            onPress={onPressBack}
          />

          {!isStart && isReady && (
            <TextTimer
              setIsFinish={setIsStart}
              timerInfo={startTimer}
              setTimerInfo={setStartTimer}
            />
          )}

          {!isInput && isStart && isReady && (
            <TextTimer
              setIsFinish={setIsInput}
              timerInfo={inputTimer}
              setTimerInfo={setInputTimer}
            />
          )}

          {isInput && isStart && isReady && (
            <Text style={{ color: "#ffffff", fontSize: 18 }}>스코어: 00점</Text>
          )}

          <ChanceIcons />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: (isReady) => {
    return {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: "100%",
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: isReady ? "#212529" : "#212529",
      color: "#ffffff",
    };
  },
});

export default GameHeader;
