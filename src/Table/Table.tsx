import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayerButtons from "../Buttons/PlayerButtons";
import Dealer from "../Participants/Dealer";
import Player from "../Participants/Player";
import { deckOfCards } from "./cardConstants";

interface Props {}
type CurrentCard = { id: string; type: string; value: number } | null;

const PlayArea = styled.div`
  background-color: green;
  width: 100%;
  height: 500px;
`;

const Table = (props: Props) => {
  const [dealerDeck, setDealerDeck] = useState(deckOfCards);
  const [turn, setTurn] = useState(null);
  const [currentCard, setCurrentCard] = useState<CurrentCard>(null);

  const drawCard = () => {
    const randomCardIndex = Math.floor(Math.random() * dealerDeck.length);
    const currentCard = setCurrentCard(dealerDeck[randomCardIndex]);
    console.log(dealerDeck.filter((_, index) => index !== randomCardIndex));
    setDealerDeck(dealerDeck.filter((_, index) => index !== randomCardIndex));
  };

  return (
    <PlayArea>
      <Dealer />
      <Player />
      <PlayerButtons drawCard={drawCard} />
    </PlayArea>
  );
};

export default Table;
