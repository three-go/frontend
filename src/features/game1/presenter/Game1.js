import React from "react";

import { View, StyleSheet } from "react-native";

import {
  FaceRecognitionContainer,
  MapContainer,
  FaceDirectionRecord,
} from "..";
import { colors, game } from "../../../common";
import {
  GameLayout,
  NextStageModalContainer,
  InputModalContainer,
  FailModalContainer,
  TextTimer,
  ResetModalContainer,
} from "../../../components";

const Game1 = ({
  status,
  setStatus,
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
  onTimerEnd,
}) => {
  return (
    <GameLayout
      status={status}
      setStatus={setStatus}
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
              {status === game.status.none && (
                <TextTimer
                  onTimerEnd={onTimerEnd}
                  timerInfo={readyTimer}
                  setTimerInfo={setReadyTimer}
                />
              )}

              {status === game.status.open && (
                <MapContainer
                  status={status}
                  stage={stage}
                  directions={directions}
                  setIsWin={setIsWin}
                  gameMap={gameMap}
                />
              )}

              {status === game.status.directionInput && (
                <FaceRecognitionContainer
                  selectedDirection={selectedDirection}
                  onSelectedDirection={setSelectedDirection}
                  cameraPermissionStatus={cameraPermissionStatus}
                  setCameraPermissionStatus={setCameraPermissionStatus}
                />
              )}

              {status === game.status.play && (
                <MapContainer
                  status={status}
                  stage={stage}
                  directions={directions}
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
            {status === game.status.open && (
              <FaceDirectionRecord directions={directions} status={status} />
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
    backgroundColor: colors.dark,
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
    backgroundColor: colors.dark,
  },
});

export default Game1;
