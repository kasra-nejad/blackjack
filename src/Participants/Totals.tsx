import React from "react";
import styled from "styled-components";

const TotalWrapper = styled.div`
  width: 50px;
  height: 50px;
  border: solid 2px white;
`;

type Props = {
  total?: number;
};

const Totals: React.FC<Props> = (props) => {
  const { total } = props;
  return (
    <TotalWrapper>
      <p>{total}</p>
    </TotalWrapper>
  );
};

export default Totals;
