import React, { useReducer } from "react";
import styled from "styled-components";
import PlayerButtons from "../Buttons/PlayerButtons";
import Dealer from "../Participants/Dealer";
import Player from "../Participants/Player";
import { participants } from "./cardConstants";
import { setDealerDeck, setHands, setTurn, startGame } from "./gameActions";
import { GameContext } from "./gameContext";
import { gameReducer, initialState } from "./gameReducer";

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

const Table: React.FC = () => {
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

  const double = () => {
    drawCard(gameState.turn);
    toggleTurn();
  };
  return (
    <GameContext.Provider value={{ state: gameState, dispatch }}>
      <PlayArea>
        <Dealer drawCard={drawCard} />
        <Player />
        <PlayerButtons drawCard={drawCard} start={start} double={double} />
      </PlayArea>
    </GameContext.Provider>
  );
};

export default Table;
