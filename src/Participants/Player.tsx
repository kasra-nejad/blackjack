import React from "react";
import Totals from "./Totals";
import { CurrentCard } from "../Table/Table";
import { useGetParticipantTotal } from "./utils";

type Props = {
  hand: CurrentCard[];
};

const Player = (props: Props) => {
  const { hand } = props;
  const total = useGetParticipantTotal(hand);

  return (
    <>
      {hand.map((card) => {
        <div>{card?.id}</div>;
      })}
      <Totals total={total} />
    </>
  );
};

export default Player;
