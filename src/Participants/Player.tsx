import React, { useContext, useEffect } from "react";
import Totals from "./Totals";
import { CurrentCard } from "../Table/Table";
import { useGetParticipantTotal } from "./utils";
import Card from "../Table/Card";
import styled from "styled-components";
import { participants } from "../Table/cardConstants";
import { GameContext } from "../Table/gameContext";
import { setTurn } from "../Table/gameActions";

const PlayerArea = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
`;

const Player = () => {
  const context = useContext(GameContext);
  const dispatch = context.dispatch;
  const { hands } = context.state;
  const playerHand = hands[participants.PLAYER_1];
  const total = useGetParticipantTotal(playerHand);

  useEffect(() => {
    if (total >= 21) {
      dispatch(setTurn(participants.DEALER));
    }
  }, [dispatch, total]);

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
