import React, { useState, useEffect, useRef, useContext } from "react";

import {
  StyleSheet,
  Linking,
  Platform,
  ImageBackground,
  View,
  Text,
} from "react-native";
import RNExitApp from "react-native-exit-app";
import { GameEngine } from "react-native-game-engine";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { SafeAreaView } from "react-native-safe-area-context";
import RNSoundLevel from "react-native-sound-level";

import { colors } from "../../../common/constants";
import SmallButton from "../../../components/Buttons/SmallButton";
import GameLayout from "../../../components/Layouts/GameLayout";
import InputModalContainer from "../../../components/Modals/InputModalContainer";
import RetryModalContainer from "../../../components/Modals/RetryModalContainer";
import GameContext from "../../../context/GameContext";
import entities from "../entities";
import Physics from "../physics";

const ShoutGoContainer = () => {
  const { currentGameKey } = useContext(GameContext);
  const gameEngine = useRef();

  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [chance, setChance] = useState(3);

  const [status, setStatus] = useState("none");
  const [micPermission, setMicPermission] = useState("");

  useEffect(() => {
    if (micPermission === RESULTS.GRANTED) {
      return;
    }

    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO;

    const checkMicPermission = async () => {
      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        setMicPermission(RESULTS.GRANTED);
      } else if (result === RESULTS.BLOCKED) {
        setMicPermission(RESULTS.BLOCKED);
      } else if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);
        setMicPermission(requestResult);
      }
    };

    checkMicPermission();
  }, []);

  useEffect(() => {
    RNSoundLevel.start();

    if (micPermission === RESULTS.GRANTED) {
      RNSoundLevel.start();
      RNSoundLevel.onNewFrame = (data) => {
        gameEngine.current?.dispatch({
          type: "decibel",
          payload: { volume: data.value },
        });
      };

      setRunning(true);
    }

    return () => {
      RNSoundLevel.stop();
      setRunning(false);
    };
  }, [micPermission]);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setScore((prev) => prev + 1);
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  const openSettingOption = async () => {
    try {
      await Linking.openSettings();
      RNExitApp.exitApp();
    } catch (error) {
      RNExitApp.exitApp();
    }
  };

  const decreaseChance = () => {
    if (chance >= 1) {
      setStatus("collision");
      setChance((prev) => prev - 1);
    } else {
      setStatus("end");
    }
  };

  const handleRetryGame = () => {
    gameEngine.current.swap(entities());
    gameEngine.current.start();
    setRunning(true);
    setStatus("none");
  };

  const handleGameEvent = (event) => {
    switch (event.type) {
      case "gameOver":
        if (status === "none") {
          gameEngine.current.stop();
          setRunning(false);
          decreaseChance();
        }
        break;
    }
  };

  return (
    <GameLayout currentGameKey={currentGameKey} score={score} chance={chance}>
      {status === "collision" && (
        <RetryModalContainer onRetryGame={handleRetryGame} />
      )}

      {status === "end" && <InputModalContainer score={score} />}

      <ImageBackground
        style={styles.background}
        source={require("../../../../public/assets/images/shoutGo/background.png")}
        resizeMode="stretch"
      />

      <SafeAreaView style={styles.container}>
        <GameEngine
          ref={gameEngine}
          systems={[Physics]}
          entities={entities()}
          running={running}
          onEvent={handleGameEvent}
          style={styles.gameEngine}
        />
      </SafeAreaView>

      {micPermission === RESULTS.BLOCKED && (
        <View style={styles.notAuthorizedViewContainer}>
          <Text style={styles.notAuthorizedViewTitle}>
            권한 승인이 필요 합니다.{"\n"}
          </Text>
          <Text>
            해당 서비스를 사용하기 위해서는 카메라 권한 승인이 필요합니다. 해당
            권한을 승인하지 않으면 서비스 이용이 제한됩니다.{"\n"}
          </Text>
          <SmallButton
            content="설정으로 가기"
            color={colors.red}
            onPress={() => {
              openSettingOption();
            }}
          />
        </View>
      )}
    </GameLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gameEngine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  notAuthorizedViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "5%",
    backgroundColor: colors.white,
  },
  notAuthorizedViewTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
});

export default ShoutGoContainer;
