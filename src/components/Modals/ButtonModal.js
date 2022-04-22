import React from "react";

import { Modal, StyleSheet, View, Text } from "react-native";

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
    height: "20%",
    padding: 35,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "#FCF8F6",
    backgroundColor: "#96A1A8",
    shadowColor: "#000000",
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
    color: "#FCF8F6",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: (count) => {
    return {
      flexDirection: "row",
      justifyContent: count > 1 ? "space-between" : "center",
      alignItems: "center",
      width: "100%",
    };
  },
});

export default ButtonModal;
