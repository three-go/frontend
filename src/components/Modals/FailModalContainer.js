import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { ButtonModal, SmallButton } from "..";

const FailModalContainer = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const handleNavigateMain = () => {
    navigation.navigate("Main");
    setModalVisible(false);
  };

  const handleRetry = () => {
    console.log("다시 시도");
    setModalVisible(false);
  };

  return (
    <ButtonModal isVisible={modalVisible} content="탈출에 실패하셨습니다.">
      <SmallButton content="다시시도" color="#00BBD1" onPress={handleRetry} />
      <SmallButton
        content="메인으로"
        color="#c92a2a"
        onPress={handleNavigateMain}
      />
    </ButtonModal>
  );
};

export default FailModalContainer;
