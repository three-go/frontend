import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

import { ButtonModal, SmallButton } from "..";
import { navigations, colors } from "../../common";

const FailModalContainer = ({ onRetryCurrentStage }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const handleNavigateMain = () => {
    navigation.navigate(navigations.main);
    setModalVisible(false);
  };

  const handleRetry = () => {
    onRetryCurrentStage();
    setModalVisible(false);
  };

  return (
    <ButtonModal isVisible={modalVisible} content="탈출에 실패하셨습니다.">
      <SmallButton
        content="다시시도"
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

export default FailModalContainer;

FailModalContainer.propTypes = {
  onRetryCurrentStage: PropTypes.func,
};
