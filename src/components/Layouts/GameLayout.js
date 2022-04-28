import React from "react";

import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameHeader } from "..";

const GameLayout = ({
  children,
  isReady,
  isStart,
  setIsStart,
  isInput,
  setIsInput,
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
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <GameHeader
          onPressBack={handleGoBack}
          isReady={isReady}
          isStart={isStart}
          setIsStart={setIsStart}
          isInput={isInput}
          setIsInput={setIsInput}
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
    backgroundColor: "#212529",
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
    backgroundColor: "#FCF8F6",
  },
});

export default GameLayout;
