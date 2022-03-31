import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 75px;
  height: 75px;
  border: solid 2px red;
  z-index: 100;
`;

type Props = {
  value?: string;
};

const Card: React.FC<Props> = (props) => {
  const { value } = props;
  return (
    <CardWrapper>
      <p>{value}</p>
    </CardWrapper>
  );
};

export default Card;
