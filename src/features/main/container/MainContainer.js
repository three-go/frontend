import React, { useState, useEffect } from "react";

import { Platform } from "react-native";
import RNExitApp from "react-native-exit-app";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SystemNavigationBar from "react-native-system-navigation-bar";

import { DefaultButton, ContentModal } from "../../../components";
import Main from "../presenter/Main";

const MainContainer = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const hideSoftKey = async () => {
      await SystemNavigationBar.navigationHide();
    };

    if (Platform.OS === "android") {
      hideSoftKey();
    }
  });

  const exitApp = () => {
    RNExitApp.exitApp();
  };

  const handleShowModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaProvider>
      <Main onExitApp={exitApp} handleShowModal={handleShowModal} />

      {modalVisible && (
        <ContentModal
          title="SCORE"
          content="김춘식 : 100점"
          isVisible={modalVisible}
        >
          <DefaultButton
            content="닫기"
            color="#e03131"
            onPress={handleShowModal}
          />
        </ContentModal>
      )}
    </SafeAreaProvider>
  );
};

export default MainContainer;
// 게임선택 -> 설명 -> 게임이동
