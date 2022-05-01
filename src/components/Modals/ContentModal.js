import React from "react";

import { Modal, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import Carousel from "../Layouts/Carousel";
import { colors } from "../../common/constants";

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
    padding: 35,
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
    width: 300,
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

ContentModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        children: PropTypes.array,
        title: PropTypes.string,
        titleContent: PropTypes.string,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          score: PropTypes.number,
        })
      ),
    ])
  ).isRequired,
  handleRenderScoreItem: PropTypes.func,
  size: PropTypes.shape({
    GAP: PropTypes.number,
    OFFSET: PropTypes.number,
    PAGE_WIDTH: PropTypes.number,
    SCREEN_WIDTH: PropTypes.number,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
