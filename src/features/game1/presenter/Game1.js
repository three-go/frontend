import React from "react";

import { View, StyleSheet } from "react-native";

import {
  GameLayout,
  NextStageModalContainer,
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
  stage,
  setStage,
  score,
  setScore,
  isWin,
  setIsWin,
  selectedDirection,
  setSelectedDirection,
  directions,
  setDirections,
  cameraPermissionStatus,
  setCameraPermissionStatus,
  gameMap,
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
      score={score}
      cameraPermissionStatus={cameraPermissionStatus}
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
                  setStage={setStage}
                  directions={directions}
                  isStart={isStart}
                  isReady={isReady}
                  isInput={isInput}
                  setIsWin={setIsWin}
                  gameMap={gameMap}
                  setDirections={setDirections}
                  score={score}
                  setScore={setScore}
                  setIsReady={setIsReady}
                  setIsStart={setIsStart}
                  setIsInput={setIsInput}
                  setReadyTimer={setReadyTimer}
                  setStartTimer={setStartTimer}
                  setInputTimer={setInputTimer}
                />
                // {isWin && <NextStageModalContainer />}
              )}
            </View>
          </View>

          <View style={styles.recordArea}>
            {isReady && (
              <FaceDirectionRecord directions={directions} isInput={isInput} />
            )}
          </View>
        </View>
      )}
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
