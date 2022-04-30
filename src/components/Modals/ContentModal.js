import React from "react";

import { Modal, StyleSheet, Text, View } from "react-native";

import { Carousel } from "..";
import { colors } from "../../common";

const ContentModal = ({
  isVisible,
  title,
  content,
  handleRenderScoreItem,
  size,
  children,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.contentContainer}>
            <Carousel
              content={content}
              renderItem={handleRenderScoreItem}
              size={size}
            />
          </View>
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
    paddingTop: 35,
    paddingBottom: 35,
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
  title: {
    marginBottom: 15,
    color: colors.ivory,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.gray,
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
