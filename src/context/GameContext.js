import React, { createContext, useState } from "react";

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [currentGameKey, setCurrentGameKey] = useState("");

  return (
    <GameContext.Provider value={{ currentGameKey, setCurrentGameKey }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
