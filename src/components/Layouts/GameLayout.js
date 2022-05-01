import React from "react";

import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";

import { GameHeader } from "..";
import { navigations, colors } from "../../common/constants";

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

GameLayout.propTypes = {
  status: PropTypes.string,
  setStatus: PropTypes.func,
  chance: PropTypes.number,
  score: PropTypes.number,
  cameraPermissionStatus: PropTypes.string,
  currentGameKey: PropTypes.string,
  children: PropTypes.element,
};
