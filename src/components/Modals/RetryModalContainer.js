import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { navigations, colors } from "../../common/constants";
import SmallButton from "../Buttons/SmallButton";
import ButtonModal from "../Modals/ButtonModal";

const RetryModalContainer = ({ onRetryGame }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const handleNavigateMain = () => {
    navigation.navigate(navigations.main);
    setModalVisible(false);
  };

  const handleRetry = () => {
    onRetryGame();
    setModalVisible(false);
  };

  return (
    <ButtonModal isVisible={modalVisible} content="계속 도전 하시겠습니까?">
      <SmallButton
        content="도전하기"
        color={colors.tealGreen}
        onPress={handleRetry}
      />
      <SmallButton
        content="메인으로"
        color={colors.red}
        onPress={handleNavigateMain}
      />
    </ButtonModal>
  );
};

export default RetryModalContainer;
