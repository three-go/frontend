import React from "react";

import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, game } from "../../../common";
import { DefaultButton, SquareButton, Logo } from "../../../components";

const Main = ({
  onExitApp,
  onShowScoreModal,
  onSetGameNameAndShowDescriptionModal,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />

      <View>
        <Logo style={styles.logo} size="lg" />
      </View>

      <View style={styles.gameWrapper}>
        {game.keys.map((value) => {
          return (
            <SquareButton
              key={value}
              content={game.names[value]}
              color={game.colors[value]}
              onPress={onSetGameNameAndShowDescriptionModal(value)}
            />
          );
        })}
      </View>

      <View style={styles.button}>
        <DefaultButton
          content="점수 보기"
          color={colors.gray}
          onPress={onShowScoreModal}
        />
      </View>

      <View style={styles.button}>
        <DefaultButton
          content="게임 종료"
          color={colors.red}
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
    backgroundColor: colors.dark,
  },
  statusBar: {
    backgroundColor: colors.dark,
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
