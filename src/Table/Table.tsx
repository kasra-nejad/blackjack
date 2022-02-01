import React from "react";
import styled from "styled-components";
import PlayerButtons from "../Buttons/PlayerButtons";
import Dealer from "../Participants/Dealer";

interface Props {}

const PlayArea = styled.div`
  background-color: green;
  width: 100%;
  height: 500px;
`;

const Table = (props: Props) => {
  return (
    <PlayArea>
      <Dealer />
      <PlayerButtons />
    </PlayArea>
  );
};

export default Table;
