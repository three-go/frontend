import React, { useState } from "react";

import { ButtonModal, SmallButton } from "..";

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
        color="#00BBD1"
        onPress={handleNextStage}
      />
    </ButtonModal>
  );
};

export default NextStageModalContainer;
