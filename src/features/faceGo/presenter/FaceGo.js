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

const FaceGo = ({ gameInfo, userInfo, cameraInfo }) => {
  const {
    stage,
    status,
    setStatus,
    result,
    setResult,
    currentGameKey,
    gameMap,
    handleNextStage,
    handleRetryStage,
    handleSetStatusOpen,
  } = gameInfo;
  const { score, setScore, chance, setChance, directions } = userInfo;
  const {
    selectedDirection,
    setSelectedDirection,
    cameraPermissionStatus,
    setCameraPermissionStatus,
  } = cameraInfo;

  return (
    <GameLayout
      status={status}
      setStatus={setStatus}
      chance={chance}
      score={score}
      cameraPermissionStatus={cameraPermissionStatus}
      currentGameKey={currentGameKey}
    >
      {currentGameKey === "faceGo" && (
        <View style={styles.container}>
          <View style={styles.playArea}>
            <View style={styles.playZone}>
              {status === game.status.none && (
                <TextTimer onTimerEnd={handleSetStatusOpen} status={status} />
              )}

              {status === game.status.open && (
                <MapContainer
                  stage={stage}
                  status={status}
                  setResult={setResult}
                  gameMap={gameMap}
                  directions={directions}
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
                  stage={stage}
                  status={status}
                  setResult={setResult}
                  gameMap={gameMap}
                  score={score}
                  setScore={setScore}
                  directions={directions}
                  setChance={setChance}
                />
              )}

              {result === game.result.win && (
                <NextStageModalContainer onNextStage={handleNextStage} />
              )}

              {result === game.result.lose && (
                <FailModalContainer onRetryCurrentStage={handleRetryStage} />
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
