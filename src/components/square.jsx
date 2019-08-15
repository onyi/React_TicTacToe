import React from 'react';

const Square = ({ pos, value, placeMove }) => {

  let shapeClass = '';
  if(value === 'X') shapeClass = "x"
  else if(value === 'O') shapeClass = "o"

  return (
    <button id={`square-${pos}`} className={`game-board-square ${shapeClass}`} onClick={() => placeMove(pos)}>
      <span>
        {value}
      </span>
    </button>
  )

}

export default Square