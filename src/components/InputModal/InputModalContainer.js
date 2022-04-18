import React, { useState } from "react";

import { Keyboard } from "react-native";

import { SmallButton, InputModal } from "../../components";

const InputModalContainer = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState("");

  // 유저 스코어 로직 가져오는 로직 필요

  const onRegister = (name) => {
    // 유저 스코어 등록 로직 필요
    setModalVisible(false);
    setName("");
    Keyboard.dismiss();
  };

  return (
    <InputModal
      score="200"
      modalVisible={modalVisible}
      name={name}
      setName={setName}
      onRegister={onRegister}
    >
      <SmallButton content="등록" color="#2196F3" onPress={onRegister} />
    </InputModal>
  );
};

export default InputModalContainer;
