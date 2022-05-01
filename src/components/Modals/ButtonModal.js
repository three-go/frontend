import React from "react";

import { Modal, StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

import { colors } from "../../common";

const ButtonModal = ({ content, isVisible, children }) => {
  const count = React.Children.count(children);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.textContainer}>{content}</Text>
          <View style={styles.buttonContainer(count)}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    height: "25%",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: colors.ivory,
    backgroundColor: colors.gray,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    marginBottom: 20,
    color: colors.ivory,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: (count) => {
    return {
      flexDirection: "row",
      justifyContent: count > 1 ? "space-evenly" : "center",
      alignItems: "center",
      width: "100%",
    };
  },
});

export default ButtonModal;

ButtonModal.propTypes = {
  content: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
