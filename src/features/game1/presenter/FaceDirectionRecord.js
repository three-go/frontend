import React, { useEffect, useRef } from "react";

import { View, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const FaceDirectionRecord = ({ directions, isInput }) => {
  const scrollView = useRef(null);

  useEffect(() => {
    if (isInput) {
      scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [isInput]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        horizontal={true}
        onContentSizeChange={() => {
          if (!isInput) {
            scrollView.current.scrollToEnd({ animated: true });
          }
        }}
      >
        {directions.map((item, index) => {
          const isHilightedItem = isInput
            ? index === 0
            : !directions[index + 1];
          const iconColor = isHilightedItem ? "#00E0EA" : "#FFFFFF";

          return (
            <View key={index} style={styles.itemContainer}>
              <Icon
                name={`arrow${item.direction}`}
                size={50}
                color={iconColor}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
  },
  scrollContainer: {
    flexDirection: "row",
    width: 300,
    height: "100%",
    backgroundColor: "#96A1A8",
  },
  contentContainer: {
    alignItems: "center",
  },
  itemContainer: {
    width: 50,
  },
});

export default FaceDirectionRecord;
