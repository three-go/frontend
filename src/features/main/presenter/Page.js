import React from "react";

import { StyleSheet, View, Text, ScrollView } from "react-native";

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
    backgroundColor: "#FCF8F6",
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
      borderColor: "#FCF8F6",
      backgroundColor: index % 2 === 0 ? "#96A1A8" : "#FCF8F6",
    };
  },
  text: {
    width: "50%",
    color: "#212529",
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
