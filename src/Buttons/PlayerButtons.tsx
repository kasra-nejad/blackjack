import React, { useState } from "react";

export interface IPlayerButtonsProps {
  drawCard: () => void;
}

const PlayerButtons: React.FC<IPlayerButtonsProps> = (props) => {
  const { drawCard } = props;
  const [isDoubleDisabled, setIsDoubleDisabled] = useState(false);
  const [isSplitDisabled, setISSplitDisabled] = useState(false);
  return (
    <div id="button-contianer" style={{ display: "flex" }}>
      <button className="button" name="hit" onClick={drawCard}>
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
