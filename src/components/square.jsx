import React from 'react';

const Square = ({ pos, value, placeMove }) => {

  return (
    <button className="game-board-square" onClick={() => placeMove(pos)}>
      <span>
        {value}
      </span>
    </button>
  )

}

export default Square