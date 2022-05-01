import React from "react";

import { StyleSheet, View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";

import { colors } from "../../../common";

const Page = ({ item, style }) => {
  return (
    <View style={[styles.container, style]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {item.length ? (
          item.map((value, index) => {
            return (
              <View key={value.id} style={styles.wrapper(index)}>
                <Text style={styles.text}>{value.name}</Text>
                <Text style={styles.text}>{value.score}</Text>
              </View>
            );
          })
        ) : (
          <View style={styles.empty}>
            <Text style={styles.text}>등록된 정보가 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.ivory,
  },
  wrapper: (index) => {
    return {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
      height: 50,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: colors.ivory,
      backgroundColor: index % 2 === 0 ? colors.gray : colors.ivory,
    };
  },
  text: {
    width: "50%",
    color: colors.dark,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  empty: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    minHeight: "100%",
  },
});

export default Page;

Page.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      score: PropTypes.number,
    })
  ),
  style: PropTypes.object,
};
