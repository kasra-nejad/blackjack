import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayerButtons from "../Buttons/PlayerButtons";
import Dealer from "../Participants/Dealer";
import Player from "../Participants/Player";
import { deckOfCards, participants } from "./cardConstants";

export type CurrentCard = { id: string; type: string; value: number } | null;

const PlayArea = styled.div`
  background-color: green;
  width: 100%;
  height: 500px;
`;

const Table: React.FC = () => {
  const [isInitialDeal, setIsInitialDeal] = useState(true);
  const [dealerDeck, setDealerDeck] = useState(deckOfCards);
  const [turn, setTurn] = useState<string>(participants.PLAYER_1);
  const [currentCard, setCurrentCard] = useState<CurrentCard>(null);
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
    setCurrentCard(dealerDeck[randomCardIndex]);
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
    setIsInitialDeal(false);
  };

  return (
    <PlayArea>
      <Dealer hand={hands[participants.DEALER]} />
      <Player hand={hands[participants.PLAYER_1]} />
      <PlayerButtons
        drawCard={drawCard}
        start={start}
        turn={turn}
        isInitialDeal={isInitialDeal}
      />
    </PlayArea>
  );
};

export default Table;
