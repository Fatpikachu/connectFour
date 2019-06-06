import React, { Component } from 'react';
import Square from './Square.jsx';
import StartPos from './StartPos.jsx';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      board:[ [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0] ],
      player: 1
    }
  }
  
  componentDidMount(){

  }

  mouseEnter(yPos) {
    console.log('mouse enter')
    if(this.state.player === 1){
      $('#' + yPos + '.start').addClass('blue')
    } else {
      $('#' + yPos + '.start').addClass('red')
    }
  }

  mouseLeave(yPos) {
    console.log('mouse leave')
      $('#' + yPos + '.start').removeClass('blue red')
    }

  markBoard(yCord){
    var tmpBoard = this.state.board;
    for(var i = 5; i > -1; i--){
      if(tmpBoard[i][yCord] === 0){
        tmpBoard[i][yCord] = this.state.player
        if(this.state.player === 1){
          $('#'+ i + yCord + ' > div').addClass('blue')
          this.setState({board: tmpBoard}, ((i, yCord)=>{
            if(this.checkWin(i, yCord)){
              $('#'+ i + yCord + ' > div').addClass('pulsating')
              alert('Blue wins!')
            }
            this.setState({player: 2}, ()=>{
              $('#' + yCord + '.start').removeClass('blue red')
              $('#' + yCord + '.start').addClass('red')
            })
          }).bind(this, i, yCord))
        } else {
          $('#'+ i + yCord + ' > div').addClass('red')
          this.setState({board: tmpBoard}, ((i, yCord)=>{
            if(this.checkWin(i, yCord)){
              $('#'+ i + yCord + ' > div').addClass('pulsating')
              alert('Red wins!')
            }
            this.setState({player: 1}, ()=>{
              $('#' + yCord + '.start').removeClass('blue red')
              $('#' + yCord + '.start').addClass('blue')
            })
          }).bind(this, i, yCord))
        }
        break;
      }
    }

  }

  vertical(x, y){
    var count = 0;
    //iterate down
    let result = {hit: []};
    for(let i = x + 1; i <= 5; i++){
      if(this.state.board[i][y] === this.state.player){
        result.hit.push([i, y])
        count++;
      } else {
        break;
      }
    }
    //iterate up
    for(let i = x - 1; i >= 0; i--){
      if(this.state.board[i][y] === this.state.player){
        result.hit.push([i, y])
        count++;
      } else {
        break;
      }
    }
    result.win = count >= 3;
    return result;
  }

  horizontal(x, y){
    //iterate right
    var count = 0;
    let result = {hit: []};
    for(let i = y + 1; i <= 6; i++){
      if(this.state.board[x][i] === this.state.player){
        result.hit.push([x, i])
        count++;
      } else {
        break;
      }
    }
    //iterate left
    for(let i = y - 1; i >= 0; i--){
      if(this.state.board[x][i] === this.state.player){
        result.hit.push([x, i])
        count++;
      } else {
        break;
      }
    }
    result.win = count >= 3;
    return result;
  }

  rDiagonal(x, y){
    var count = 0;
    var tmpY = y;
    let result = {hit: []};
    //up
    for(let i = x - 1; i >= 0; i--){
      y = y - 1;
      if(this.state.board[i][y] === this.state.player){
        result.hit.push([i, y])
        count++
      } else {
        break;
      }
    }
    //down
    for(let i = x + 1; i <= 5; i++){
      tmpY = tmpY + 1;
      if(this.state.board[i][tmpY] === this.state.player){
        result.hit.push([i, tmpY])
        count++
      } else {
        break;
      }
    }
    result.win = count >= 3;
    return result;
  }

  lDiagonal(x, y){
    var count = 0;
    var tmpY = y;
    let result = {hit: []};
    //up
    for(let i = x - 1; i >= 0; i--){
      y = y + 1;
      if(this.state.board[i][y] === this.state.player){
        result.hit.push([i, y])
        count++
      } else {
        break;
      }
    }
    //down
    for(let i = x + 1; i <= 5; i++){
      tmpY = tmpY - 1;
      if(this.state.board[i][tmpY] === this.state.player){
        result.hit.push([i, tmpY])
        count++
      } else {
        break;
      }
    }
    result.win = count >= 3;
    return result;
  }

  checkWin(x, y){
    console.log('checkwin called')
    let horz = this.horizontal(x, y);
    let vert = this.vertical(x, y);
    let rD = this.rDiagonal(x, y);
    let lD = this.lDiagonal(x, y);
    if(horz.win) {
      for(let i = 0 ; i < horz.hit.length; i ++){
        $('#'+ horz.hit[i][0] + horz.hit[i][1] + ' > div').addClass('pulsating')
      }
      return true;
    } else if(vert.win) {
      for(let i = 0 ; i < vert.hit.length; i ++){
        $('#'+ vert.hit[i][0] + vert.hit[i][1] + ' > div').addClass('pulsating')
      }
      return true;
    } else if(rD.win) {
      for(let i = 0 ; i < rD.hit.length; i ++){
        $('#'+ rD.hit[i][0] + rD.hit[i][1] + ' > div').addClass('pulsating')
      }
      return true;
    } else if(lD.win){
      for(let i = 0 ; i < lD.hit.length; i ++){
        $('#'+ lD.hit[i][0] + lD.hit[i][1] + ' > div').addClass('pulsating')
      }
      return true;
    }
    return false;
  }

  reset(){
    $('.circle').removeClass('blue red pulsating');
    this.setState({board: [ [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0] ],
              player: 1})
  }

  render() {
    let board = [];
    let top = [];
    for(let k = 0; k < 7; k++){
      top.push(<StartPos x={k} />)
    }
    for(let i = 0; i < 6; i++){
      for(let j = 0; j < 7; j++){
        board.push(<Square player={this.state.player} x={i} y={j} 
          markBoard={this.markBoard.bind(this)} 
          mouseEnter={this.mouseEnter.bind(this)}
          mouseLeave={this.mouseLeave.bind(this)} />)
      }
      board.push(<br />,
      )
    }
    let player1 = <div className='pTurn p1'>'s turn</div>
    let player2 = <div className='pTurn p2'>'s turn</div>
    return (
      <React.Fragment>
      <div className='title'>Konnect 4</div>
      <div className='rightPanel'>
        <div className='info'>
          2 Players compete to connect four of their respective colors to win.
        </div>
      {
        this.state.player === 1 ? player1 : player2
      }
      </div>
      <div className='game'>
        <div>{top}</div>
        <div>{board}</div>
        <button onClick={this.reset.bind(this)}>Reset</button>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
