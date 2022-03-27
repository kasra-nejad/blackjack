import { useEffect, useState } from "react";
import { CurrentCard } from "../Table/Table";

const getTotal = (hand: CurrentCard[]) =>
  hand.reduce((previousValue: number, currentValue: CurrentCard) => {
    if (currentValue) {
      return previousValue + currentValue.value;
    }
    return 0;
  }, 0);

export const useGetParticipantTotal = (hand: CurrentCard[]) => {
  const [participantTotal, setParticipantTotal] = useState(0);
  useEffect(() => {
    setParticipantTotal(getTotal(hand));
  }, [hand]);

  return participantTotal;
};
