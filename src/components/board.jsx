import React from  'react';

import Square from './square';

class Board extends React.Component {
  constructor(props){
    super(props);
  }

  createGameBoardGrid(pos, value, placeMove){
    return (<Square pos={pos} value={value} placeMove={placeMove}></Square>)
  }

  render(){
    const { placeMove, squares, currentPlayer } = this.props;

    return (
      <div className="game-board">
        <div className="game-board-container">
          <div className="game-board-row">
            {this.createGameBoardGrid(0, squares[0], placeMove)}
            {this.createGameBoardGrid(1, squares[1], placeMove)}
            {this.createGameBoardGrid(2, squares[2], placeMove)}
            {/* <Square value={squares[1]} placeMove={placeMove}></Square>
            <Square value={squares[2]} placeMove={placeMove}></Square>
            <Square value={squares[3]} placeMove={placeMove}></Square> */}
          </div>
          <div className="game-board-row">
            {this.createGameBoardGrid(3, squares[3], placeMove)}
            {this.createGameBoardGrid(4, squares[4], placeMove)}
            {this.createGameBoardGrid(5, squares[5], placeMove)}
            {/* <Square value={squares[4]} placeMove={placeMove}></Square>
            <Square value={squares[5]} placeMove={placeMove}></Square>
            <Square value={squares[6]} placeMove={placeMove}></Square> */}
          </div>
          <div className="game-board-row">
            {this.createGameBoardGrid(6, squares[6], placeMove)}
            {this.createGameBoardGrid(7, squares[7], placeMove)}
            {this.createGameBoardGrid(8, squares[8], placeMove)}
            {/* <Square value={squares[7]} placeMove={placeMove}></Square>
            <Square value={squares[8]} placeMove={placeMove}></Square>
            <Square value={squares[9]} placeMove={placeMove}></Square> */}
          </div>

        </div>
      </div>
    )
  }
}


export default Board;