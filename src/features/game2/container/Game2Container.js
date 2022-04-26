import React, { useContext, useState } from "react";

import { GameContext } from "../../../context";
import Game2 from "../presenter/Game2";

const Game2Container = () => {
  const { currentGameKey } = useContext(GameContext);
  const [progressRate, setProgressRate] = useState({
    current: 0,
    total: 5,
  });

  return (
    <Game2
      currentGameKey={currentGameKey}
      progressRate={progressRate}
      setProgressRate={setProgressRate}
    />
  );
};

export default Game2Container;
