import React, { useState, useEffect, useContext } from "react";

import { useRoute } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";
import RNExitApp from "react-native-exit-app";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SystemNavigationBar from "react-native-system-navigation-bar";
import PropTypes from "prop-types";

import GameGuide from "../presenter/GameGuide";
import Main from "../presenter/Main";
import Page from "../presenter/Page";
import { colors } from "../../../common/constants";
import { game } from "../../../common/property";
import ContentModal from "../../../components/Modals/ContentModal";
import SmallButton from "../../../components/Buttons/SmallButton";
import DefaultButton from "../../../components/Buttons/DefaultButton";
import GameContext from "../../../context/GameContext";
import { getItemFromAsync } from "../../../utils/asyncStorageHelper";
import {
  convertContentToArray,
  descendOrderArray,
} from "../../../utils/helper";

const size = {
  SCREEN_WIDTH: 300,
  GAP: 15,
  OFFSET: 15,
  PAGE_WIDTH: 300 - (15 + 15) * 2,
};

const MainContainer = ({ navigation }) => {
  const route = useRoute();
  const { currentGameKey, setCurrentGameKey } = useContext(GameContext);

  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [scoreData, setScoreData] = useState({
    faceGo: null,
    shoutGo: null,
  });

  useEffect(() => {
    const hideSoftKey = async () => {
      await SystemNavigationBar.navigationHide();
    };

    if (Platform.OS === "android") {
      hideSoftKey();
    }
  }, []);

  useEffect(() => {
    if (route.params?.visible) {
      setScoreModalVisible(true);
      route.params.visible = false;
    }
  });

  useEffect(() => {
    const loadScoreData = async () => {
      const faceGoScoreData = await getItemFromAsync(game.keys[0]);
      const shoutGoScoreData = await getItemFromAsync(game.keys[1]);

      setScoreData((data) => {
        return {
          ...data,
          faceGo: faceGoScoreData,
          shoutGo: shoutGoScoreData,
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
    navigation.navigate(currentGameKey === "faceGo" ? "FaceGo" : "ShoutGo");
    setDescriptionModalVisible(!descriptionModalVisible);
  };

  const handleRenderScoreItem = ({ item }) => {
    return (
      <Page
        item={descendOrderArray(item, "score")}
        style={styles.pageWrapper(size)}
      />
    );
  };

  const handlerRenderGuideItem = ({ item }) => {
    return <GameGuide item={item} style={styles.pageWrapper(size)} />;
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
            color={colors.red}
            onPress={handleShowScoreModal}
          />
        </ContentModal>
      )}

      {descriptionModalVisible && (
        <ContentModal
          isVisible={descriptionModalVisible}
          title="GUIDE"
          content={game.description[currentGameKey]}
          handleRenderScoreItem={handlerRenderGuideItem}
          size={size}
        >
          <SmallButton
            content="게임 시작"
            color={colors.tealGreen}
            onPress={handleStartGame}
          />
          <SmallButton
            content="닫기"
            color={colors.red}
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
      width: prop.PAGE_WIDTH - 40,
      marginHorizontal: prop.GAP / 2,
    };
  },
});

export default MainContainer;

MainContainer.propTypes = {
  navigation: PropTypes.object,
};
