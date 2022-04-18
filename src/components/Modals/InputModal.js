import React from "react";

import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const InputModal = ({
  score,
  modalVisible,
  name,
  setName,
  onRegister,
  children,
}) => {
  return (
    <Modal transparent={true} visible={modalVisible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
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
      </KeyboardAvoidingView>
    </Modal>
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
    justifyContent: "space-between",
    alignItems: "center",
    width: 350,
    height: 200,
    margin: 20,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    elevation: 5,
    shadowColor: "#212529",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: "#2196F3",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    elevation: 2,
  },
  textStyle: {
    color: "#f8f9fa",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});

export default InputModal;