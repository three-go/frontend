import React from "react";

import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { game } from "../../../common";
import { DefaultButton, SquareButton, Logo } from "../../../components";

const Main = ({
  onExitApp,
  onShowScoreModal,
  onSetGameNameAndShowDescriptionModal,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#212529" barStyle="light-content" />

      <View>
        <Logo style={styles.logo} size="lg" />
      </View>

      <View style={styles.gameWrapper}>
        {game.keys.map((v) => {
          return (
            <SquareButton
              key={v}
              content={game.names[v]}
              color={game.colors[v]}
              onPress={onSetGameNameAndShowDescriptionModal(v)}
            />
          );
        })}
      </View>

      <View style={styles.button}>
        <DefaultButton
          content="점수 보기"
          color="#96A1A8"
          onPress={onShowScoreModal}
        />
      </View>

      <View style={styles.button}>
        <DefaultButton
          content="게임 종료"
          color="#c92a2a"
          onPress={onExitApp}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212529",
  },
  statusBar: {
    backgroundColor: "#212529",
  },
  gameWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 100,
    marginTop: 50,
    marginBottom: 100,
  },
  button: {
    marginBottom: 20,
  },
});

export default Main;
