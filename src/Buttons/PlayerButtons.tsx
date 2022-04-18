import React, { useContext, useState } from "react";
import { GameContext } from "../Table/Table";

export interface IPlayerButtonsProps {
  drawCard: (participant: string) => void;
  start: () => void;
}

const PlayerButtons: React.FC<IPlayerButtonsProps> = (props) => {
  const { drawCard, start } = props;
  const context = useContext(GameContext);
  const { turn, isGameStarted } = context.state;
  const [isDoubleDisabled, setIsDoubleDisabled] = useState(false);
  const [isSplitDisabled, setISSplitDisabled] = useState(false);
  return (
    <div id="button-container" style={{ display: "flex" }}>
      <button className="button" name="hit" onClick={() => drawCard(turn)}>
        hit
      </button>
      <button className="button" name="stand">
        stand
      </button>
      <button className="button" disabled={isDoubleDisabled} name="double">
        double
      </button>
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
