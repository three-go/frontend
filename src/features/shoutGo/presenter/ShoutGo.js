import React from "react";

import { Text } from "react-native";

import GameLayout from "../../../components/Layouts/GameLayout";

const ShoutGo = ({ currentGameKey, progressRate, setProgressRate }) => {
  return (
    <GameLayout
      currentGameKey={currentGameKey}
      progressRate={progressRate}
      setProgressRate={setProgressRate}
    >
      <Text>
        ShoutGo{"\n"}GameLayout{"\n"}children
      </Text>
    </GameLayout>
  );
};

export default ShoutGo;
