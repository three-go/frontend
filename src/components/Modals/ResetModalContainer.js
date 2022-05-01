import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { ButtonModal } from "..";
import SmallButton from "../Buttons/SmallButton";
import { navigations, colors } from "../../common/constants";

const ResetModalContainer = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const handleNavigateMain = () => {
    navigation.navigate(navigations.main);
    setModalVisible(false);
  };

  return (
    <ButtonModal isVisible={modalVisible} content="남은 하트가 없습니다.">
      <SmallButton
        content="메인으로"
        color={colors.red}
        onPress={handleNavigateMain}
      />
    </ButtonModal>
  );
};

export default ResetModalContainer;
