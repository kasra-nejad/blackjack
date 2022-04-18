import React, { useContext } from "react";
import Totals from "./Totals";
import { CurrentCard, GameContext } from "../Table/Table";
import { useGetParticipantTotal } from "./utils";
import Card from "../Table/Card";
import styled from "styled-components";
import { participants } from "../Table/cardConstants";

const PlayerArea = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
`;

const Player = () => {
  const context = useContext(GameContext);
  const { hands } = context.state;
  const playerHand = hands[participants.PLAYER_1];
  const total = useGetParticipantTotal(playerHand);

  return (
    <PlayerArea>
      {playerHand.map((card: CurrentCard) => {
        return <Card value={card?.id} key={card?.id} />;
      })}
      <Totals total={total} />
    </PlayerArea>
  );
};

export default Player;
