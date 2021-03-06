import React from "react";

import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import { colors } from "../../../common/constants";
import { game } from "../../../common/property";
import GameLayout from "../../../components/Layouts/GameLayout";
import FailModalContainer from "../../../components/Modals/FailModalContainer";
import InputModalContainer from "../../../components/Modals/InputModalContainer";
import NextStageModalContainer from "../../../components/Modals/NextStageModalContainer";
import ResetModalContainer from "../../../components/Modals/ResetModalContainer";
import TextTimer from "../../../components/Timers/TextTimer";
import FaceRecognitionContainer from "../container/FaceRecognitionContainer";
import MapContainer from "../container/MapContainer";
import FaceDirectionRecord from "./FaceDirectionRecord";

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
      {game.keys.includes(currentGameKey) && (
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

              {result === game.result.lose && chance > -1 && (
                <FailModalContainer onRetryCurrentStage={handleRetryStage} />
              )}

              {result === game.result.lose && chance === -1 && (
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

FaceGo.propTypes = {
  gameInfo: PropTypes.shape({
    stage: PropTypes.number,
    status: PropTypes.string,
    setStatus: PropTypes.func,
    result: PropTypes.string,
    setResult: PropTypes.func,
    currentGameKey: PropTypes.string,
    gameMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    handleNextStage: PropTypes.func,
    handleRetryStage: PropTypes.func,
    handleSetStatusOpen: PropTypes.func,
  }).isRequired,
  userInfo: PropTypes.shape({
    score: PropTypes.number.isRequired,
    setScore: PropTypes.func.isRequired,
    chance: PropTypes.number.isRequired,
    setChance: PropTypes.func.isRequired,
    directions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        direction: PropTypes.string,
      })
    ),
  }),
  cameraInfo: PropTypes.shape({
    selectedDirection: PropTypes.shape({
      id: PropTypes.string,
      direction: PropTypes.string,
    }),
    onSelectedDirection: PropTypes.func,
    cameraPermissionStatus: PropTypes.string.isRequired,
    setCameraPermissionStatus: PropTypes.func.isRequired,
  }),
};

FaceGo.defaultProps = {
  selectedDirection: {},
  onSelectedDirection: () => {},
  directions: [],
};
