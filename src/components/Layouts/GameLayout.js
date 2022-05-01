import React from "react";

import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameHeader } from "..";
import { navigations, colors, game } from "../../common";

const GameLayout = ({
  status,
  setStatus,
  chance,
  score,
  cameraPermissionStatus,
  currentGameKey,
  children,
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate(navigations.main);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <GameHeader
          status={status}
          setStatus={setStatus}
          onPressBack={handleGoBack}
          chance={chance}
          score={score}
          cameraPermissionStatus={cameraPermissionStatus}
          currentGameKey={currentGameKey}
        />
      </View>

      <View
        style={
          currentGameKey === game.keys[0]
            ? styles.faceGoBoard
            : styles.shoutGoBoard
        }
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    height: "10%",
  },
  faceGoBoard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: colors.ivory,
  },
  shoutGoBoard: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.lightBlue,
  },
});

export default GameLayout;
