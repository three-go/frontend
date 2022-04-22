import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { ButtonModal, SmallButton } from "../src/components";

const ResetModalContainer = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const handleNavigateMain = () => {
    console.log("초기화 로직 필요?");
    navigation.navigate("Main");
    setModalVisible(false);
  };

  return (
    <ButtonModal isVisible={modalVisible} content="남은 하트가 없습니다.">
      <SmallButton
        content="메인으로"
        color="#c92a2a"
        onPress={handleNavigateMain}
      />
    </ButtonModal>
  );
};

export default ResetModalContainer;
