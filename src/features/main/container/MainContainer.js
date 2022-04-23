import React, { useState, useEffect, useContext } from "react";

import { Platform, StyleSheet } from "react-native";
import RNExitApp from "react-native-exit-app";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SystemNavigationBar from "react-native-system-navigation-bar";

import Page from "../../../../Temp/Page";
import { DefaultButton, SmallButton, ContentModal } from "../../../components";
import { GameContext } from "../../../context";
import {
  game,
  getItemFromAsync,
  convertContentToArray,
  descendOrderScoreArray,
} from "../../../utils";
import Main from "../presenter/Main";

const size = {
  SCREEN_WIDTH: 300,
  GAP: 15,
  OFFSET: 15,
  PAGE_WIDTH: 300 - (15 + 15) * 2,
};

const MainContainer = ({ navigation }) => {
  const { currentGameKey, setCurrentGameKey } = useContext(GameContext);

  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [scoreData, setScoreData] = useState({
    game1: null,
    game2: null,
  });

  useEffect(() => {
    const hideSoftKey = async () => {
      await SystemNavigationBar.navigationHide();
    };

    if (Platform.OS === "android") {
      hideSoftKey();
    }
  });

  useEffect(() => {
    const loadScoreData = async () => {
      const game1ScoreData = await getItemFromAsync(game.keys[0]);
      const game2ScoreData = await getItemFromAsync(game.keys[1]);

      setScoreData((data) => {
        return {
          ...data,
          game1: game1ScoreData,
          game2: game2ScoreData,
        };
      });
    };
    loadScoreData();
  }, [scoreModalVisible]);

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

  const handleRenderScoreItem = ({ item }) => {
    return (
      <Page
        item={descendOrderScoreArray(item)}
        style={styles.pageWrapper(size)}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <Main
        onExitApp={exitApp}
        onShowScoreModal={handleShowScoreModal}
        onSetGameNameAndShowDescriptionModal={
          handleSetGameNameAndShowDescriptionModal
        }
      />

      {scoreModalVisible && (
        <ContentModal
          isVisible={scoreModalVisible}
          title="점수 목록"
          content={convertContentToArray(scoreData, game.keys)}
          handleRenderScoreItem={handleRenderScoreItem}
          size={size}
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
          isVisible={descriptionModalVisible}
          title="게임 설명"
          content={convertContentToArray(scoreData, game.keys)}
          handleRenderScoreItem={handleRenderScoreItem}
          size={size}
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

const styles = StyleSheet.create({
  pageWrapper: (prop) => {
    return {
      width: prop.PAGE_WIDTH,
      marginHorizontal: prop.GAP / 2,
    };
  },
});

export default MainContainer;
