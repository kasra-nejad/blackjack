import React, { useState } from "react";
import styled from "styled-components";
import Card from "../Table/Card";
import { CurrentCard } from "../Table/Table";
import Totals from "./Totals";
import { useGetParticipantTotal } from "./utils";

type Props = {
  hand: CurrentCard[];
};

const DealerArea = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
`;

const Dealer = (props: Props) => {
  const { hand } = props;
  const total = useGetParticipantTotal(hand);

  return (
    <DealerArea>
      {hand.map((card: CurrentCard) => {
        return <Card value={card?.id} />;
      })}
      <Totals total={total} />
    </DealerArea>
  );
};

export default Dealer;
