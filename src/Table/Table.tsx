import React, {
  useState,
  useContext,
  createContext,
  Dispatch,
  ReducerAction,
  useReducer,
} from "react";
import styled from "styled-components";
import PlayerButtons from "../Buttons/PlayerButtons";
import Dealer from "../Participants/Dealer";
import Player from "../Participants/Player";
import { deckOfCards, participants } from "./cardConstants";

export type Card = {
  id: string;
  type: string;
  value: number;
  deckNumber: number;
};
export type CurrentCard = Card | null;

const PlayArea = styled.div`
  background-color: green;
  width: 100%;
  height: 500px;
`;

type GameState = {
  isGameStarted: boolean;
  dealerDeck: Card[];
  turn: string;
  hands: { [key: string]: CurrentCard[] };
};

type GameActions = {
  type: string;
  payload?: unknown;
};

const Table: React.FC = () => {
  const GameContext = createContext({});
  const initialState: GameState = {
    isGameStarted: false,
    dealerDeck: deckOfCards,
    turn: participants.PLAYER_1,
    hands: {
      [participants.PLAYER_1]: [],
      [participants.DEALER]: [],
    },
  };

  const TOGGLE_TURN = "TOGGLE_TURN";

  function gameReducer(state: GameState, action: GameActions): GameState {
    switch (action.type) {
      case TOGGLE_TURN:
        return {
          ...initialState,
          turn: Object.values(participants).find(
            (participant) => participant !== state.turn
          )!,
        };
      default:
        return state;
    }
  }

  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [dealerDeck, setDealerDeck] = useState(deckOfCards);
  const [turn, setTurn] = useState<string>(participants.PLAYER_1);
  const [hands, setHands] = useState<{ [key: string]: CurrentCard[] }>({
    [participants.PLAYER_1]: [],
    [participants.DEALER]: [],
  });
  const toggleTurn = () => {
    if (turn === participants.PLAYER_1) {
      setTurn(participants.DEALER);
      return;
    }
    setTurn(participants.PLAYER_1);
  };

  const drawCard = (participant: string) => {
    const randomCardIndex = Math.floor(Math.random() * dealerDeck.length);
    setHands(
      Object.assign(hands, {
        [participant]: [...hands[participant], dealerDeck[randomCardIndex]],
      })
    );
    setDealerDeck(dealerDeck.filter((_, index) => index !== randomCardIndex));
  };

  const start = () => {
    Array(2)
      .fill(
        Object.values(participants).copyWithin(
          Object.values(participants).length,
          0
        )
      )
      .flat()
      .forEach((participant: string) => {
        drawCard(participant);
        toggleTurn();
      });
    setIsGameStarted(true);
    setTurn(participants.PLAYER_1);
  };

  return (
    <GameContext.Provider>
      <PlayArea>
        <Dealer
          hand={hands[participants.DEALER]}
          isGameStarted={isGameStarted}
          turn={turn}
          drawCard={drawCard}
        />
        <Player hand={hands[participants.PLAYER_1]} />
        <PlayerButtons
          drawCard={drawCard}
          start={start}
          turn={turn}
          isGameStarted={isGameStarted}
        />
      </PlayArea>
    </GameContext.Provider>
  );
};

export default Table;
