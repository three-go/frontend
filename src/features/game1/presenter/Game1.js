import React from "react";

import { Text, View, StyleSheet } from "react-native";

import { GameLayout, TextTimer } from "../../../components";
import MapContainer from "../container/MapContainer";
import { FaceRecognitionContainer } from "../container";
import FaceDirectionRecord from "./FaceDirectionRecord";

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
  selectedDirection,
  setSelectedDirection,
  setDirections,
  directions,
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
            <MapContainer
              stage={1}
              directions={directions}
              onAnimationEnd={setDirections}
            />
          )}

          {!isInput && isStart && isReady && (
            <FaceRecognitionContainer
              selectedDirection={selectedDirection}
              onSelectedDirection={setSelectedDirection}
            />
          )}

          {isInput && isStart && isReady && (
            <Text style={{ color: "#ffffff", fontSize: 30 }}>
              게임 진행 중 !!!
            </Text>
          )}
        </View>
      </View>

      <View style={styles.recordArea}>
        {isReady && <FaceDirectionRecord directions={directions} />}
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
});

export default Game1;
