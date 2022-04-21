import React from "react";

import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DefaultButton, SquareButton, Logo } from "../../../components";
import { game } from "../../../utils";

const Main = ({
  onExitApp,
  handleShowScoreModal,
  handleSelectGameNumberAndShowDescriptionModal,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#212529" barStyle="light-content" />
      <View>
        <Logo style={styles.logo} size="lg" />
      </View>

      <View style={styles.gameWrapper}>
        {game.names.map((v, i) => {
          return (
            <SquareButton
              key={v}
              content={v}
              color={game.colors[i]}
              onPress={handleSelectGameNumberAndShowDescriptionModal(i)}
            />
          );
        })}
      </View>

      <View style={styles.button}>
        <DefaultButton
          content="점수 보기"
          color="#96A1A8"
          onPress={handleShowScoreModal}
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
