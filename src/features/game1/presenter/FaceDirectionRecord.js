import React, { useRef } from "react";

import { View, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const FaceDirectionRecord = ({ directions }) => {
  const scrollView = useRef(null);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        horizontal={true}
        onContentSizeChange={() => {
          scrollView.current.scrollToEnd({ animated: false });
        }}
      >
        {directions.map((item, index) => {
          const isLastItem = !directions[index + 1];
          const iconColor = isLastItem ? "#FF0000" : "#FFFFFF";

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
