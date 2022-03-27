import React, { useState } from "react";

export interface IPlayerButtonsProps {
  drawCard: (participant: string) => void;
  turn: string;
}

const PlayerButtons: React.FC<IPlayerButtonsProps> = (props) => {
  const { drawCard, turn } = props;
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
    </div>
  );
};

export default PlayerButtons;
