import React from "react";

import { Text, View, StyleSheet } from "react-native";

import MapContainer from "../container/MapContainer";
import {
  GameLayout,
  InputModalContainer,
  TextTimer,
} from "../../../components";
import { FaceRecognitionContainer } from "../container";
import MapContainer from "../container/MapContainer";
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
  directions,
  cameraPermissionStatus,
  setCameraPermissionStatus,
  setIsWin,
  stage,
  gameMap,
  score,
  setScore,
  currentGameKey,
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
      cameraPermissionStatus={cameraPermissionStatus}
      score={score}
    >
      {currentGameKey === "game1" && (
        <View style={styles.container}>
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
                  stage={stage}
                  directions={directions}
                  isStart={isStart}
                  isReady={isReady}
                  setIsWin={setIsWin}
                  gameMap={gameMap}
                />
              )}

              {!isInput && isStart && isReady && (
                <FaceRecognitionContainer
                  selectedDirection={selectedDirection}
                  onSelectedDirection={setSelectedDirection}
                  cameraPermissionStatus={cameraPermissionStatus}
                  setCameraPermissionStatus={setCameraPermissionStatus}
                />
              )}

              {isInput && isStart && isReady && (
                <MapContainer
                  stage={stage}
                  directions={directions}
                  isStart={isStart}
                  isReady={isReady}
                  isInput={isInput}
                  setIsWin={setIsWin}
                  gameMap={gameMap}
                  score={score}
                  setScore={setScore}
                />
              )}
            </View>
          </View>

<<<<<<< HEAD
      <View style={styles.recordArea}>
        {isReady && (
          <FaceDirectionRecord directions={directions} isInput={isInput} />
        )}
      </View>
=======
          <View style={styles.recordArea}>
            {isReady && <FaceDirectionRecord directions={directions} />}
          </View>
        </View>
      )}
>>>>>>> e703f393b63b94479c4f0ed50a6422fdc47cc14c
    </GameLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
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
