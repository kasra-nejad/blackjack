import React, { createContext, useReducer } from "react";
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

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
};

type GameState = {
  isGameStarted: boolean;
  dealerDeck: Card[];
  turn: string;
  hands: { [key: string]: CurrentCard[] };
};

type GameActions = {
  type: string;
  payload?: any;
};
export const GameContext = createContext({} as GameContextType);

const Table: React.FC = () => {
  const initialState: GameState = {
    isGameStarted: false,
    dealerDeck: deckOfCards,
    turn: participants.PLAYER_1,
    hands: {
      [participants.PLAYER_1]: [],
      [participants.DEALER]: [],
    },
  };

  const SET_TURN = "SET_TURN";
  const START_GAME = "START_GAME";
  const SET_HANDS = "SET_HANDS";
  const SET_DEALER_DECK = "SET_DEALER_DECK";

  const setTurn = (payload: string) => ({
    type: SET_TURN,
    payload,
  });

  const startGame = (payload: boolean) => ({
    type: START_GAME,
    payload,
  });

  const setHands = (payload: { participant: string; cardIndex: number }) => ({
    type: SET_HANDS,
    payload,
  });

  const setDealerDeck = (payload: number) => ({
    type: SET_DEALER_DECK,
    payload,
  });

  function gameReducer(state: GameState, action: GameActions): GameState {
    const { type, payload } = action;
    switch (type) {
      case SET_TURN:
        return {
          ...state,
          turn: payload,
        };
      case START_GAME:
        return {
          ...state,
          isGameStarted: payload,
        };
      case SET_HANDS:
        return {
          ...state,
          hands: {
            ...state.hands,
            [payload.participant]: [
              ...state.hands[payload.participant],
              state.dealerDeck[payload.cardIndex],
            ],
          },
        };
      case SET_DEALER_DECK:
        return {
          ...state,
          dealerDeck: state.dealerDeck.filter((_, index) => index !== payload),
        };

      default:
        return state;
    }
  }

  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const toggleTurn = () => {
    if (gameState.turn === participants.PLAYER_1) {
      dispatch(setTurn(participants.DEALER));
      return;
    }
    dispatch(setTurn(participants.PLAYER_1));
  };

  const drawCard = (participant: string) => {
    const randomCardIndex = Math.floor(
      Math.random() * gameState.dealerDeck.length
    );
    dispatch(
      setHands({ participant: participant, cardIndex: randomCardIndex })
    );
    dispatch(setDealerDeck(randomCardIndex));
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
    dispatch(startGame(true));
    dispatch(setTurn(participants.PLAYER_1));
  };
  return (
    <GameContext.Provider value={{ state: gameState, dispatch }}>
      <PlayArea>
        <Dealer drawCard={drawCard} />
        <Player />
        <PlayerButtons drawCard={drawCard} start={start} />
      </PlayArea>
    </GameContext.Provider>
  );
};

export default Table;
