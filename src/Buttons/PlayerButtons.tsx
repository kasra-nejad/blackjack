import React, { useContext } from "react";
import { participants } from "../Table/cardConstants";
import { setTurn } from "../Table/gameActions";
import { GameContext } from "../Table/gameContext";

export interface IPlayerButtonsProps {
  drawCard: (participant: string) => void;
  start: () => void;
  double: () => void;
}

const PlayerButtons: React.FC<IPlayerButtonsProps> = (props) => {
  const { drawCard, start, double } = props;
  const context = useContext(GameContext);
  const dispatch = context.dispatch;
  const { turn, isGameStarted, hands } = context.state;
  const isDoubleDisabled = !isGameStarted || hands[turn].length !== 2;
  const isSplitDisabled =
    !isGameStarted || hands[turn][0]?.value !== hands[turn][1]?.value;

  return (
    <div id="button-container" style={{ display: "flex" }}>
      <button
        className="button"
        name="hit"
        disabled={turn === participants.DEALER || !isGameStarted}
        onClick={() => drawCard(turn)}
      >
        hit
      </button>
      <button
        className="button"
        name="stand"
        onClick={() => dispatch(setTurn(participants.DEALER))}
        disabled={turn === participants.DEALER || !isGameStarted}
      >
        stand
      </button>
      <button
        className="button"
        disabled={isDoubleDisabled}
        name="double"
        onClick={double}
      >
        double
      </button>
      {/*TODO implement split*/}
      <button className="button" disabled={isSplitDisabled} name="split">
        split
      </button>
      <button
        className="button"
        disabled={isGameStarted}
        name="start"
        onClick={start}
      >
        start
      </button>
    </div>
  );
};

export default PlayerButtons;
