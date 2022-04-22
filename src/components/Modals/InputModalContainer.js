import React, { useState, useContext } from "react";

import { Keyboard } from "react-native";

import { SmallButton } from "..";
import { GameContext } from "../../context";
import { setItemToAsync, getItemFromAsync } from "../../utils";
import InputModal from "./InputModal";

const InputModalContainer = () => {
  const { currentGameKey } = useContext(GameContext);

  const [modalVisible, setModalVisible] = useState(true);
  const [userName, setUserName] = useState("");

  const onRegister = () => {
    const scoreData = getItemFromAsync(currentGameKey);

    setItemToAsync(currentGameKey);
    setModalVisible(false);
    Keyboard.dismiss();
  };

  return (
    <InputModal
      score="200"
      modalVisible={modalVisible}
      name={userName}
      setName={setUserName}
      onRegister={onRegister}
    >
      <SmallButton content="등록" color="#00BBD1" onPress={onRegister} />
    </InputModal>
  );
};

export default InputModalContainer;
