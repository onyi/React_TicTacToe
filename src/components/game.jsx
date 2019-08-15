import React from 'react';

import Board from './board';

import merge from 'lodash'

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
      step: DEFAULT.step ,
      xIsNext: DEFAULT.xIsNext ,
      statusText: DEFAULT.statusText ,
      gameState: DEFAULT.gameState

    }
    this.placeMove = this.placeMove.bind(this);
    this.startGame = this.startGame.bind(this);

  }
  

  startGame(){
    this.setState({
      gameState: 1
    })
  }

  placeMove(pos){
    if(this.state.gameState === 1){
      if (!this.state.histories[this.state.step][pos]){
        console.log(`Square is empty, valid move`);
        let newArr = Array.from(this.state.histories[this.state.step]);
        let shape = this.state.xIsNext ? 'X' : 'O';
        newArr[pos] = shape;
        let newStep = this.state.step + 1;
        let newHistories = this.state.histories;
        newHistories[newStep] = newArr
        this.setState({
          xIsNext: !this.state.xIsNext,
          histories: newHistories,
          step: newStep
        });
        this.checkWinner(shape, newArr);
  
      }else{
        console.log(`Square contains value, Invalid move!`);
  
      }
    }
  }

  checkWinner(shape, moves){
    const { step } = this.state;

    if (step === 8){
      //Nobody wins
      this.setState({
        statusText: `Nobody wins! It is a tie!`,
        gameState: 0

      })
    }else{
      let moveIndices = [];
      for (let i = 0; i <= 8; i++ ){
        if(moves[i] === shape) moveIndices.push(i);
      }
      for (let i = 0; i < WINNING_COMBO.length; i++ ){
        let combo = WINNING_COMBO[i];
        const [ a,b,c ] = combo;
        console.log(`${a} ${b} ${c}`);
        if (moveIndices.includes(a) && moveIndices.includes(b) && moveIndices.includes(c)){
          this.setState({
            statusText: `Player with ${shape} shape won the game!!!`,
            gameState: 0
          })
          return;
        }
      }

    }
    this.setState({
      statusText: `Current Player Turn: ${shape}`
    })

  }

  render(){
    console.log(`Histories: ${JSON.stringify(this.state.histories)}`)
    let squares = this.state.histories[this.state.step];
    const { step, xIsNext, statusText, gameState} = this.state;
    console.log(`Square: ${squares}, step: ${step}`)
    return(
      <div className="game-container">
        <h1>React Tic Tac Toe</h1>
        <h3>{statusText}</h3>
        <Board placeMove={this.placeMove} squares={squares} currentPlayer={xIsNext ? 'X' : 'O'}/>
        {gameState === 0 ? <button onClick={this.startGame}>Start Game</button> : <button onClick={this.startGame}>Restart</button> }
      </div>
    )
  }


}


export default Game;