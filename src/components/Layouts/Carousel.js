import React from "react";

import { FlatList, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import { game } from "../../common/property";

const Carousel = ({ content, renderItem, size }) => {
  return (
    <View style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.listWrapper(size)}
        data={content}
        decelerationRate="fast"
        horizontal
        keyExtractor={(_, index) => game.keys[index]}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={size.PAGE_WIDTH + size.GAP}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  listWrapper: (prop) => {
    return {
      paddingHorizontal: prop.OFFSET + prop.GAP / 2,
    };
  },
});

export default Carousel;

Carousel.propTypes = {
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
  renderItem: PropTypes.func.isRequired,
  size: PropTypes.shape({
    GAP: PropTypes.number,
    OFFSET: PropTypes.number,
    PAGE_WIDTH: PropTypes.number,
    SCREEN_WIDTH: PropTypes.number,
  }).isRequired,
};
