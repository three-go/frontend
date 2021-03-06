import React, { useState } from "react";

import PropTypes from "prop-types";

import { colors } from "../../common/constants";
import SmallButton from "../Buttons/SmallButton";
import ButtonModal from "./ButtonModal";

const NextStageModalContainer = ({ onNextStage }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleNextStage = () => {
    setModalVisible(false);
    onNextStage();
  };

  return (
    <ButtonModal isVisible={modalVisible} content="탈출에 성공하셨습니다.">
      <SmallButton
        content="다음 단계로"
        color={colors.tealGreen}
        onPress={handleNextStage}
      />
    </ButtonModal>
  );
};

export default NextStageModalContainer;

NextStageModalContainer.propTypes = {
  onNextStage: PropTypes.func,
};
