import React, { useState } from "react";

// import { useNavigation } from "@react-navigation/native";

import { ButtonModal, SmallButton } from "..";

const NextStageModalContainer = () => {
  const [modalVisible, setModalVisible] = useState(true);
  // const navigation = useNavigation();

  const handleNextStage = () => {
    // 다음단계 함수();
    console.log("다음단계로!!!");
    setModalVisible(false);
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
