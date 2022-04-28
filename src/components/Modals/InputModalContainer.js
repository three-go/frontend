import React, { useState, useContext } from "react";

import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import uuid from "react-native-uuid";

import { SmallButton, InputModal } from "..";
import { GameContext } from "../../context";
import { setItemToAsync, getItemFromAsync } from "../../utils";

const InputModalContainer = ({ score }) => {
  const navigation = useNavigation();
  const { currentGameKey } = useContext(GameContext);
  const [modalVisible, setModalVisible] = useState(true);
  const [userName, setUserName] = useState("");

  const onRegister = async () => {
    try {
      const data = await getItemFromAsync(currentGameKey);

      if (!data) {
        await setItemToAsync(currentGameKey, [
          {
            id: uuid.v4(),
            name: userName.trim() === "" ? "이름없음" : userName,
            score,
          },
        ]);
      } else {
        data.push({
          id: uuid.v4(),
          name: userName.trim() === "" ? "이름없음" : userName,
          score,
        });
        await setItemToAsync(currentGameKey, data);
      }

      setModalVisible(false);
      Keyboard.dismiss();
      navigation.navigate("Main", { visible: true });
    } catch (error) {
      setModalVisible(false);
      Keyboard.dismiss();
      navigation.navigate("Main");
    }
  };

  return (
    <InputModal
      score={score}
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
