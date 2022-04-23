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
  cameraPermissionStatus,
}) => {
  return (
    <View>
      {isReady && (
        <View style={styles.container}>
          <SmallButton
            content="뒤로 가기"
            color="#96A1A8"
            onPress={onPressBack}
          />

          {!isStart && isReady && (
            <TextTimer
              setIsFinish={setIsStart}
              timerInfo={startTimer}
              setTimerInfo={setStartTimer}
            />
          )}

          {!isInput &&
            cameraPermissionStatus === "READY" &&
            isStart &&
            isReady && (
              <TextTimer
                setIsFinish={setIsInput}
                timerInfo={inputTimer}
                setTimerInfo={setInputTimer}
              />
            )}

          {isInput && isStart && isReady && (
            <Text style={{ color: "#FCF8F6", fontSize: 15 }}>스코어: 00점</Text>
          )}

          <ChanceIcons />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#212529",
    color: "#FCF8F6",
  },
});

export default GameHeader;
