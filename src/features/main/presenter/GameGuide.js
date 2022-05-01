import React from "react";

import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";

import { colors } from "../../../common/constants";

const GameGuide = ({ item, style }) => {
  return (
    <View style={[styles.container, style]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.titleContent}</Text>
        </View>
        {item.children.map((value) => {
          return (
            <View key={value.id}>
              <View style={styles.imageContainer}>
                <Text style={styles.title}>{value.title}</Text>
                <Image style={styles.image} source={value.image} />
                {value.icon && (
                  <Icon style={styles.icon} name={value.icon} size={100} />
                )}
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.content}>{value.content}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 5,
    backgroundColor: colors.dark,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ivory,
  },
  content: {
    marginBottom: 10,
    fontSize: 12,
    color: colors.ivory,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: 500,
    borderTopWidth: 5,
    borderTopColor: colors.ivory,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
  },
  icon: {
    position: "absolute",
    top: 200,
    left: 63,
  },
});

export default GameGuide;

GameGuide.propTypes = {
  item: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        icon: PropTypes.string,
        id: PropTypes.string.isRequired,
        image: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
    title: PropTypes.string.isRequired,
    titleContent: PropTypes.string.isRequired,
  }),
  style: PropTypes.object,
};
