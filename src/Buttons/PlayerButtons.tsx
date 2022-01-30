import React, { useState } from 'react';

export interface IPlayerButtonsProps {
}

export default function PlayerButtons (props: IPlayerButtonsProps) {
  const [isDoubleDisabled, setIsDoubleDisabled] = useState(false);
  const [isSplitDisabled, setISSplitDisabled] = useState(false);  
  return (
    <div id='button-contianer' style={{'display': "flex"}}>
      <button className="button" name='hit'>hit</button>
      <button className="button" name='stand'>stand</button>
      <button className="button" disabled={isDoubleDisabled} name='double'>double</button>
      <button className="button" disabled={isSplitDisabled} name='split'>split</button>
    </div>
  );
}

