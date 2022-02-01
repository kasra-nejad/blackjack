import React from "react";
import styled from "styled-components";
import Totals from "./Totals";

interface Props {}

const DealerWrapper = styled.div`
  width: 100px;
  height: 100px;
`;

const Dealer = (props: Props) => {
  return (
    <DealerWrapper>
      <Totals />
    </DealerWrapper>
  );
};

export default Dealer;
