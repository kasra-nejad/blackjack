import React, { useState } from "react";
import styled from "styled-components";
import { CurrentCard } from "../Table/Table";
import Totals from "./Totals";
import { useGetParticipantTotal } from "./utils";

type Props = {
  hand: CurrentCard[];
};

const DealerWrapper = styled.div`
  width: 100px;
  height: 100px;
`;

const Dealer = (props: Props) => {
  const { hand } = props;
  const total = useGetParticipantTotal(hand);

  return (
    <DealerWrapper>
      {hand.map((card) => {
        <div>{card?.id}</div>;
      })}
      <Totals total={total} />
    </DealerWrapper>
  );
};

export default Dealer;
