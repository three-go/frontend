import React from "react";

import { FlatList, StyleSheet, View } from "react-native";

import { game } from "../../utils";

const Carousel = ({ content, renderItem, size }) => {
  return (
    <View style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.listWrapper(size)}
        data={content}
        decelerationRate="fast"
        horizontal
        keyExtractor={(_, i) => game.keys[i]}
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
