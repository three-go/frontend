import React, { useContext, useState } from "react";

import GameContext from "../../../context/GameContext";
import ShoutGo from "../presenter/ShoutGo";

const ShoutGoContainer = () => {
  const { currentGameKey } = useContext(GameContext);
  const [progressRate, setProgressRate] = useState({
    current: 0,
    total: 5,
  });

  return (
    <ShoutGo
      currentGameKey={currentGameKey}
      progressRate={progressRate}
      setProgressRate={setProgressRate}
    />
  );
};

export default ShoutGoContainer;
