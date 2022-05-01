import React, { useEffect, useRef } from "react";

import { View, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import PropTypes from "prop-types";

import { colors, iconSizes } from "../../../common/constants";
import { game } from "../../../common/property";

const FaceDirectionRecord = ({ directions, status }) => {
  const scrollView = useRef(null);

  const handleContentSizeChange = () => {
    if (status === game.status.directionInput) {
      scrollView.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    if (status === game.status.play) {
      scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [status]);

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
          const isHilightedItem =
            status === game.status.play ? index === 0 : !directions[index + 1];
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

FaceDirectionRecord.propTypes = {
  directions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      direction: PropTypes.string,
    })
  ),
  status: PropTypes.string.isRequired,
};

FaceDirectionRecord.defaultProps = {
  directions: [],
};
