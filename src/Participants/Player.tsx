import React from "react";
import Totals from "./Totals";
import { CurrentCard } from "../Table/Table";
import { useGetParticipantTotal } from "./utils";
import Card from "../Table/Card";
import styled from "styled-components";

type Props = {
  hand: CurrentCard[];
};

const PlayerArea = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
`;

const Player = (props: Props) => {
  const { hand } = props;
  const total = useGetParticipantTotal(hand);
  console.log(hand);
  return (
    <PlayerArea>
      {hand.map((card: CurrentCard) => {
        return <Card value={card?.id} />;
      })}
      <Totals total={total} />
    </PlayerArea>
  );
};

export default Player;
