import React, { useEffect, useRef } from "react";

import { View, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { colors, iconSizes } from "../../../common";

const FaceDirectionRecord = ({ directions, isInput }) => {
  const scrollView = useRef(null);

  const handleContentSizeChange = () => {
    if (!isInput) {
      scrollView.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    if (isInput) {
      scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [isInput]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        style={styles.scrollWrapper}
        contentContainerStyle={styles.contentWrapper}
        horizontal={true}
        onContentSizeChange={handleContentSizeChange}
      >
        {directions.map((value, index) => {
          const isHilightedItem = isInput
            ? index === 0
            : !directions[index + 1];
          const iconColor = isHilightedItem ? colors.turquoise : colors.white;

          return (
            <View key={value.id} style={styles.directionWrapper}>
              <Icon
                name={`arrow${value.direction}`}
                size={iconSizes.footerArrow}
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
  scrollWrapper: {
    flexDirection: "row",
    width: 310,
    height: "100%",
    borderRadius: 10,
    borderColor: colors.ivory,
    borderWidth: 5,
    backgroundColor: colors.gray,
  },
  contentWrapper: {
    alignItems: "center",
  },
  directionWrapper: {
    width: 50,
  },
});

export default FaceDirectionRecord;
