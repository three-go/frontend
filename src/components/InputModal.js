import React, { useState } from "react";

import { Modal, StyleSheet, Text, View, TextInput } from "react-native";

const InputModal = ({
  score,
  modalVisible,
  name,
  setName,
  onRegister,
  children,
}) => {
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>점수: {score}</Text>

            <Text style={styles.modalText}>
              스코어에 등록할 이름을 입력해 주세요 .
            </Text>

            <TextInput
              style={styles.inputStyle}
              placeholder="이름을 입력하세요."
              value={name}
              onChangeText={setName}
              onSubmitEditing={onRegister}
              returnKeyType="done"
            />

            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    alignItems: "center",
    margin: 20,
    padding: 35,
    borderRadius: 20,
    width: "80%",
    height: "30%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputStyle: {
    marginTop: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#2196F3",
    width: "80%",
    textAlign: "center",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default InputModal;
