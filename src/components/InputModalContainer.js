import React, { useState } from "react";

import { Keyboard } from "react-native";

import InputModal from "./InputModal";

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
      setModalVisible={setModalVisible}
      name={name}
      onRegister={onRegister}
    />
  );
};

export default InputModalContainer;
