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
import PropTypes from "prop-types";

import { colors } from "../../common";

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
          <Text style={styles.modalTitle}>축하합니다 !</Text>
          <Text style={styles.modalScore}>점수: {score}</Text>

          <Text style={styles.modalText}>
            점수 기록에 사용할 이름을
            {"\n"}
            입력해 주세요.
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
    height: 350,
    margin: 20,
    padding: 15,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: colors.ivory,
    backgroundColor: colors.gray,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    color: colors.ivory,
    fontSize: 22,
  },
  modalScore: {
    color: colors.ivory,
    fontSize: 30,
    fontWeight: "bold",
  },
  modalText: {
    color: colors.ivory,
    textAlign: "center",
    fontSize: 18,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: colors.ivory,
    color: colors.ivory,
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.tealGreen,
    elevation: 2,
  },
  textStyle: {
    color: colors.ivory,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default InputModal;

InputModal.propTypes = {
  score: PropTypes.number.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
