import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Card from "../Table/Card";
import { participants } from "../Table/cardConstants";
import { endGame } from "../Table/gameActions";
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
  const dispatch = context.dispatch;
  const { turn, isGameStarted, hands } = context.state;
  const dealerHand = hands[participants.DEALER];
  console.log(
    "🚀 ~ file: Dealer.tsx ~ line 27 ~ Dealer ~ dealerHand",
    dealerHand
  );
  const total = useGetParticipantTotal(dealerHand);
  const dealerTotal = dealerHand.reduce((a, b) => {
    if (b) {
      return a + b?.value;
    }
    return a;
  }, 0);

  useEffect(() => {
    if (turn === participants.DEALER && isGameStarted) {
      if (dealerTotal < 17) {
        drawCard(turn);
        return;
      }
      dispatch(endGame());
    }
  }, [turn, isGameStarted, drawCard, dealerTotal, dispatch]);

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
