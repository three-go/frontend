import React, { useState, useEffect, useContext } from "react";

import { Platform } from "react-native";
import RNExitApp from "react-native-exit-app";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SystemNavigationBar from "react-native-system-navigation-bar";

import { DefaultButton, SmallButton, ContentModal } from "../../../components";
import { GameContext } from "../../../context";
import { game } from "../../../utils";
import Main from "../presenter/Main";

const MainContainer = ({ navigation }) => {
  const { currentGameKey, setCurrentGameKey } = useContext(GameContext);

  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

  useEffect(() => {
    const hideSoftKey = async () => {
      await SystemNavigationBar.navigationHide();
    };

    if (Platform.OS === "android") {
      hideSoftKey();
    }
  }, []);

  const exitApp = () => {
    RNExitApp.exitApp();
  };

  const handleShowScoreModal = () => {
    setScoreModalVisible(!scoreModalVisible);
  };

  const handleShowDescriptionModal = () => {
    setDescriptionModalVisible(!descriptionModalVisible);
  };

  const handleSetGameNameAndShowDescriptionModal = (name) => {
    return () => {
      setCurrentGameKey(name);
      setDescriptionModalVisible(!descriptionModalVisible);
    };
  };

  const handleStartGame = () => {
    setDescriptionModalVisible(!descriptionModalVisible);
    navigation.navigate("Game1");
  };

  console.log("----------------------------------");
  console.log("currentGameKey", currentGameKey);
  console.log("----------------------------------");

  return (
    <SafeAreaProvider>
      <Main
        onExitApp={exitApp}
        handleShowScoreModal={handleShowScoreModal}
        handleSetGameNameAndShowDescriptionModal={
          handleSetGameNameAndShowDescriptionModal
        }
      />

      {scoreModalVisible && (
        <ContentModal
          title="점수 현황"
          content="김춘식 : 500점"
          isVisible={scoreModalVisible}
        >
          <DefaultButton
            content="닫기"
            color="#c92a2a"
            onPress={handleShowScoreModal}
          />
        </ContentModal>
      )}

      {descriptionModalVisible && (
        <ContentModal
          title="게임 설명"
          content={game.description[currentGameKey]}
          isVisible={descriptionModalVisible}
        >
          <SmallButton
            content="게임 시작"
            color="#00BBD1"
            onPress={handleStartGame}
          />
          <SmallButton
            content="닫기"
            color="#c92a2a"
            onPress={handleShowDescriptionModal}
          />
        </ContentModal>
      )}
    </SafeAreaProvider>
  );
};

export default MainContainer;
