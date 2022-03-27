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
  const [turn, setTurn] = useState<string>(Object.keys(participants)[0]);
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
    setHands({ ...hands, [participant]: [...hands[participant], currentCard] });
    setDealerDeck(dealerDeck.filter((_, index) => index !== randomCardIndex));
  };

  const start = () => {
    Object.keys(participants).forEach((participant) => drawCard(participant));
    setIsInitialDeal(false);
  };

  return (
    <PlayArea>
      <Dealer hand={hands[participants.DEALER]} />
      <Player hand={hands[participants.PLAYER_1]} />
      <PlayerButtons drawCard={drawCard} turn={turn} />
    </PlayArea>
  );
};

export default Table;
