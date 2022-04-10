import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Table/Card";
import { participants } from "../Table/cardConstants";
import { CurrentCard } from "../Table/Table";
import Totals from "./Totals";
import { useGetParticipantTotal } from "./utils";

type Props = {
  hand: CurrentCard[];
  isGameStarted: boolean;
  turn: string;
  drawCard: (participant: string) => void;
};

const DealerArea = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
`;

const Dealer = (props: Props) => {
  const { hand, isGameStarted, turn, drawCard } = props;
  const total = useGetParticipantTotal(hand);

  useEffect(() => {
    const dealerTotal = hand.reduce((a, b) => {
      if (b) {
        return a + b?.value;
      }
      return a;
    }, 0);
    if (turn === participants.DEALER && isGameStarted && dealerTotal < 17) {
      drawCard(turn);
    }
  }, [turn, isGameStarted]);

  return (
    <DealerArea>
      {turn !== participants.DEALER && isGameStarted ? (
        <Card key={hand[0]?.id} value={hand[0]?.id} />
      ) : (
        hand.map((card: CurrentCard) => {
          return <Card key={card?.id} value={card?.id} />;
        })
      )}
      <Totals total={total} />
    </DealerArea>
  );
};

export default Dealer;
