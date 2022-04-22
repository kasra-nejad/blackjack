import { createContext } from "react";
import { GameActions } from "./gameActions";
import { GameState } from "./gameReducer";

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
};

export const GameContext = createContext({} as GameContextType);
