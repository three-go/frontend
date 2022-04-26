import React from "react";

import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const GameGuide = ({ item, style }) => {
  console.log(item.children);
  return (
    <View style={[styles.container, style]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.titleContent}</Text>
        </View>
        {item.children.map((value) => {
          return (
            <>
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
            </>
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
    backgroundColor: "#212529",
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "900",
    color: "#FCF8F6",
  },
  content: {
    marginBottom: 10,
    fontSize: 12,
    color: "#FCF8F6",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: 500,
    borderTopWidth: 5,
    borderTopColor: "#FCF8F6",
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
