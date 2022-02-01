import React from "react";
import styled from "styled-components";

interface Props {}

const TotalWrapper = styled.div`
  width: 50px;
  height: 50px;
  border: solid 2px white;
`;

const Totals = (props: Props) => {
  return (
    <TotalWrapper>
      <p>12</p>
    </TotalWrapper>
  );
};

export default Totals;
