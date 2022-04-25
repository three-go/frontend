import React from "react";

import { Text } from "react-native";

import { GameLayout } from "../../../components";

const Game2 = ({ currentGameKey, progressRate, setProgressRate }) => {
  return (
    <GameLayout
      currentGameKey={currentGameKey}
      progressRate={progressRate}
      setProgressRate={setProgressRate}
    >
      <Text>
        Game2{"\n"}GameLayout{"\n"}children
      </Text>
    </GameLayout>
  );
};

export default Game2;
