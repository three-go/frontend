import React from "react";

import { View, StyleSheet } from "react-native";

import {
  FaceRecognitionContainer,
  MapContainer,
  FaceDirectionRecord,
} from "..";
import {
  GameLayout,
  NextStageModalContainer,
  InputModalContainer,
  FailModalContainer,
  TextTimer,
  ResetModalContainer,
} from "../../../components";

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
  score,
  setScore,
  isEnd,
  setIsEnd,
  isWin,
  setIsWin,
  isLose,
  setIsLose,
  selectedDirection,
  setSelectedDirection,
  directions,
  cameraPermissionStatus,
  setCameraPermissionStatus,
  gameMap,
  currentGameKey,
  handleNextStage,
  onRetryCurrentStage,
  chance,
  setChance,
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
      currentGameKey={currentGameKey}
      chance={chance}
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
                  setIsLose={setIsLose}
                  gameMap={gameMap}
                  score={score}
                  setScore={setScore}
                  setIsEnd={setIsEnd}
                  setChance={setChance}
                />
              )}

              {isEnd && <InputModalContainer score={score} />}

              {isWin && (
                <NextStageModalContainer onNextStage={handleNextStage} />
              )}

              {isLose && (
                <FailModalContainer onRetryCurrentStage={onRetryCurrentStage} />
              )}

              {isLose && chance === 0 && <ResetModalContainer />}
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
