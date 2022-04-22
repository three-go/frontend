import React, { useState } from "react";

import { Keyboard } from "react-native";

import { SmallButton } from "..";
import { setItemToAsync } from "../../utils";
import InputModal from "./InputModal";

const InputModalContainer = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState("");

  const onRegister = () => {
    setItemToAsync();
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
      <SmallButton content="등록" color="#00BBD1" onPress={onRegister} />
    </InputModal>
  );
};

export default InputModalContainer;
