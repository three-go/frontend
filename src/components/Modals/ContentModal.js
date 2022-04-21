import React from "react";

import { Modal, StyleSheet, Text, View, ScrollView } from "react-native";

const ContentModal = ({ title, content, isVisible, children }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView style={styles.contentContainer}>
            <Text>{content}</Text>
          </ScrollView>
          <View style={styles.buttonContainer}>{children}</View>
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
    alignItems: "center",
    width: "80%",
    height: "70%",
    margin: 20,
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
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: 22,
  },
});

export default ContentModal;
