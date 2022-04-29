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

const FaceGo = ({
  status,
  setStatus,
  result,
  setResult,
  stage,
  score,
  setScore,
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
      score={score}
      cameraPermissionStatus={cameraPermissionStatus}
      currentGameKey={currentGameKey}
      chance={chance}
    >
      {currentGameKey === "faceGo" && (
        <View style={styles.container}>
          <View style={styles.playArea}>
            <View style={styles.playZone}>
              {status === game.status.none && (
                <TextTimer onTimerEnd={onTimerEnd} status={status} />
              )}

              {status === game.status.open && (
                <MapContainer
                  status={status}
                  stage={stage}
                  directions={directions}
                  setResult={setResult}
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
                  setResult={setResult}
                  gameMap={gameMap}
                  score={score}
                  setScore={setScore}
                  setChance={setChance}
                />
              )}

              {result === game.result.win && (
                <NextStageModalContainer onNextStage={handleNextStage} />
              )}

              {result === game.result.lose && (
                <FailModalContainer onRetryCurrentStage={onRetryCurrentStage} />
              )}

              {result === game.result.lose && chance === 0 && (
                <ResetModalContainer />
              )}

              {result === game.result.end && (
                <InputModalContainer score={score} />
              )}
            </View>
          </View>

          <View style={styles.recordArea}>
            {status !== game.status.none && (
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

export default FaceGo;
