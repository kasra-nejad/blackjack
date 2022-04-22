import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Card from "../Table/Card";
import { participants } from "../Table/cardConstants";
import { GameContext } from "../Table/gameContext";
import { CurrentCard } from "../Table/Table";
import Totals from "./Totals";
import { useGetParticipantTotal } from "./utils";

type Props = {
  drawCard: (participant: string) => void;
};

const DealerArea = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
`;

const Dealer = (props: Props) => {
  const { drawCard } = props;
  const context = useContext(GameContext);
  const { turn, isGameStarted, hands } = context.state;
  const dealerHand = hands[participants.DEALER];
  const total = useGetParticipantTotal(dealerHand);

  useEffect(() => {
    const dealerTotal = dealerHand.reduce((a, b) => {
      if (b) {
        return a + b?.value;
      }
      return a;
    }, 0);
    if (turn === participants.DEALER && isGameStarted && dealerTotal < 17) {
      drawCard(turn);
    }
  }, [turn, isGameStarted, dealerHand, drawCard]);

  return (
    <DealerArea>
      {turn !== participants.DEALER && isGameStarted ? (
        <Card key={dealerHand[0]?.id} value={dealerHand[0]?.id} />
      ) : (
        dealerHand.map((card: CurrentCard) => {
          return <Card key={card?.id} value={card?.id} />;
        })
      )}
      <Totals
        total={
          turn !== participants.DEALER && isGameStarted
            ? total - dealerHand[1]?.value!
            : total
        }
      />
    </DealerArea>
  );
};

export default Dealer;
