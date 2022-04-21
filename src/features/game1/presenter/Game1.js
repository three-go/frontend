import React from "react";

import { Text, View, StyleSheet } from "react-native";

import FailModalContainer from "../../../../Temp/FailModalContainer";
import NextStageModalContainer from "../../../../Temp/NextStageModalContainer";
import ResetModalContainer from "../../../../Temp/ResetModalContainer";
import { GameLayout, TextTimer } from "../../../components";

const Game1 = ({
  isReady,
  setIsReady,
  isStart,
  setIsStart,
  isInput,
  setIsInput,
  readyTimer,
  setReadyTimer,
  startTimer,
  setStartTimer,
  inputTimer,
  setInputTimer,
}) => {
  return (
    <GameLayout
      isReady={isReady}
      isStart={isStart}
      setIsStart={setIsStart}
      isInput={isInput}
      setIsInput={setIsInput}
      readyTimer={readyTimer}
      setReadyTimer={setReadyTimer}
      startTimer={startTimer}
      setStartTimer={setStartTimer}
      inputTimer={inputTimer}
      setInputTimer={setInputTimer}
    >
      <View style={styles.playArea}>
        <View style={styles.playZone}>
          {!isReady && (
            <TextTimer
              setIsFinish={setIsReady}
              timerInfo={readyTimer}
              setTimerInfo={setReadyTimer}
            />
          )}

          {!isStart && isReady && (
            // <Text style={{ color: "#ffffff", fontSize: 30 }}>
            //   맵이 보이는 중 !!!
            // </Text>
            // <FailModalContainer />
            <NextStageModalContainer />
            // <ResetModalContainer />
          )}

          {!isInput && isStart && isReady && (
            <Text style={{ color: "#ffffff", fontSize: 30 }}>
              카메라 보이는 중 !!!
            </Text>
          )}

          {isInput && isStart && isReady && (
            <Text style={{ color: "#ffffff", fontSize: 30 }}>
              게임 진행 중 !!!
            </Text>
          )}
        </View>
      </View>

      <View style={styles.recordArea}>
        {isReady && <View style={styles.recordZone} />}
      </View>
    </GameLayout>
  );
};

const styles = StyleSheet.create({
  playArea: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
    backgroundColor: "#212529",
  },
  playZone: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 450,
    backgroundColor: "#FCF8F6",
  },
  recordArea: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
    backgroundColor: "#212529",
  },
  recordZone: {
    width: 300,
    height: 80,
    backgroundColor: "#FCF8F6",
  },
});

export default Game1;
