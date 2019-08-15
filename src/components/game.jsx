import React from 'react';

import Board from './board';

const WINNING_COMBO = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const DEFAULT = {
  histories: {
    0: Array(9).fill(null)
  },
  step: 0,
  xIsNext: true,
  statusText: `Current Player Turn: X`,
  gameState: 0
}

class Game extends React.Component {

  constructor(){
    super();
    this.state = {
      histories: DEFAULT.histories,
      step: DEFAULT.step,
      xIsNext: DEFAULT.xIsNext,
      statusText: '',
      gameState: DEFAULT.gameState,
      winningCombo: []
    };
    this.reset = this.reset.bind(this);
    this.reset();
    this.placeMove = this.placeMove.bind(this);
    this.startGame = this.startGame.bind(this);
    this.getNextShape = this.getNextShape.bind(this);
    this.getCurrentShape = this.getCurrentShape.bind(this);

  }

  reset(){
    this.setState({
      histories: DEFAULT.histories,
      step: DEFAULT.step,
      xIsNext: DEFAULT.xIsNext,
      statusText: DEFAULT.statusText,
      gameState: DEFAULT.gameState,
      winningCombo: []
    })
  }
  

  startGame(){
    this.reset();
    this.setState({
      gameState: 1
    })
  }

  placeMove(pos){
    if(this.state.gameState === 1){
      if (!this.state.histories[this.state.step][pos]){
        // console.log(`Square is empty, valid move`);
        let newArr = Array.from(this.state.histories[this.state.step]);
        let shape = this.getCurrentShape();
        newArr[pos] = shape;
        let newStep = this.state.step + 1;
        let newHistories = this.state.histories;
        newHistories[newStep] = newArr
        this.setState({
          xIsNext: !this.state.xIsNext,
          histories: newHistories,
          step: newStep,
          statusText: `Current Player Turn: ${this.getNextShape()}`
        });
        this.checkWinner(shape, newArr);
  
      }else{
        // console.log(`Square contains value, Invalid move!`);
  
      }
    }
  }

  getNextShape(){
    return this.state.xIsNext ? 'O' : 'X';
  }

  getCurrentShape(){
    return this.state.xIsNext ? 'X' : 'O';
  }

  checkWinner(shape, moves){
    const { step } = this.state;

    if (step === 8){
      //Nobody wins
      this.setState({
        statusText: `Nobody wins! It is a tie!`,
        gameState: 2

      })
    }else{
      let moveIndices = [];
      for (let i = 0; i <= 8; i++ ){
        if(moves[i] === shape) moveIndices.push(i);
      }
      for (let i = 0; i < WINNING_COMBO.length; i++ ){
        let combo = WINNING_COMBO[i];
        const [ a,b,c ] = combo;
        // console.log(`${a} ${b} ${c}`);
        if (moveIndices.includes(a) && moveIndices.includes(b) && moveIndices.includes(c)){
          this.setState({
            statusText: `Player with ${shape} shape won the game!!!`,
            gameState: 2,
            winningCombo: [a,b,c]
          })
          this.displayWinningCombo(a, b, c);
          return;
        }
      }

    }
  }

  componentDidUpdate(){
    if (this.state.gameState === 2 && this.state.winningCombo.length !== 0){
      const [a, b, c] = this.state.winningCombo;
      this.displayWinningCombo(a,b,c);
    }
  }

  displayWinningCombo(a,b,c){
    document.getElementById(`square-${a}`).classList.add("winner");
    document.getElementById(`square-${b}`).classList.add("winner");
    document.getElementById(`square-${c}`).classList.add("winner");
  }

  render(){
    // console.log(`Histories: ${JSON.stringify(this.state.histories)}`)
    let squares = this.state.histories[this.state.step];
    const { step, xIsNext, statusText, gameState } = this.state;
    // console.log(`Square: ${squares}, step: ${step}`)
    return(
      <div className="game-container">
        <h1>React Tic Tac Toe</h1>
        <h3>{statusText}</h3>
        <Board placeMove={this.placeMove} squares={squares} currentPlayer={xIsNext ? 'X' : 'O'} />
        <button className="game__button" onClick={this.startGame}>{gameState === 0 ? "Start Game" : "Restart"}</button>
      </div>
    )
  }


}


export default Game;