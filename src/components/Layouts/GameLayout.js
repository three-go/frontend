import React from "react";

import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameHeader } from "..";
import { navigations, colors } from "../../common";

const GameLayout = ({
  children,
  status,
  setStatus,
  startTimer,
  setStartTimer,
  inputTimer,
  setInputTimer,
  cameraPermissionStatus,
  score,
  currentGameKey,
  progressRate,
  setProgressRate,
  chance,
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
          startTimer={startTimer}
          setStartTimer={setStartTimer}
          inputTimer={inputTimer}
          setInputTimer={setInputTimer}
          cameraPermissionStatus={cameraPermissionStatus}
          score={score}
          currentGameKey={currentGameKey}
          progressRate={progressRate}
          setProgressRate={setProgressRate}
          chance={chance}
        />
      </View>
      <View style={styles.gameBoard}>{children}</View>
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
  gameBoard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: colors.ivory,
  },
});

export default GameLayout;
