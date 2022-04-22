import React, { useState, useEffect } from "react";

import { Platform } from "react-native";
import RNExitApp from "react-native-exit-app";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SystemNavigationBar from "react-native-system-navigation-bar";

import { DefaultButton, SmallButton, ContentModal } from "../../../components";
import { game } from "../../../utils";
import Main from "../presenter/Main";

const MainContainer = ({ navigation }) => {
  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [gameNumber, setGameNumber] = useState(null);

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

  const handleSelectGameNumberAndShowDescriptionModal = (n) => {
    return () => {
      setGameNumber(n);
      setDescriptionModalVisible(!descriptionModalVisible);
    };
  };

  const handleStartGame = () => {
    setGameNumber(null);
    setDescriptionModalVisible(!descriptionModalVisible);
    navigation.navigate("Game1");
  };

  return (
    <SafeAreaProvider>
      <Main
        onExitApp={exitApp}
        handleShowScoreModal={handleShowScoreModal}
        handleSelectGameNumberAndShowDescriptionModal={
          handleSelectGameNumberAndShowDescriptionModal
        }
      />

      {scoreModalVisible && (
        <ContentModal
          title="점수 현황"
          content="김춘식 : 100점"
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
          content={game.description[gameNumber]}
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
            onPress={handleSelectGameNumberAndShowDescriptionModal()}
          />
        </ContentModal>
      )}
    </SafeAreaProvider>
  );
};

export default MainContainer;
