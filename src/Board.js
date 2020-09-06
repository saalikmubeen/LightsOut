import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {

  static defaultProps = {
    numRows: 5,
    numCols: 5,
    chanceLightStartsOn: 0.27
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()

    }

    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.checkWin = this.checkWin.bind(this);
   
  }

  /** create a board numRows high/numCols wide, each cell randomly lit or unlit */

  createBoardRow = () =>{
    let boardRow = [];

    for(var j = 0; j <this.props.numCols; j++){
      boardRow.push(this.props.chanceLightStartsOn > Math.random());
  }
  return boardRow;
  }

  createBoard() {
    let board = [];
    
    for(var i = 0; i <this.props.numRows; i++){
        board.push(this.createBoardRow());
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(cord) {
    let  {numCols, numRows } = this.props;
    let board = this.state.board;
    let [x, y] = cord.split("-").map(Number);
    
    
      // if this cord is actually on board, flip it
      function flipCell(x, y){
        if (x >= 0 && x < numRows && y >= 0 && y < numCols) {
          board[x][y] = !board[x][y];
        }
      }

      flipCell(x, y);
      flipCell(x, y+1);
      flipCell(x, y-1);
      flipCell(x-1, y);
      flipCell(x+1, y);

      this.setState({board: board, hasWon: this.checkWin()});

    }


    checkWin(){
      var board = this.state.board;
      var values = [];

      board.forEach(function(row){
        row.forEach(function(col){
          values.push(col)
        })
      })
     var won = values.every(function(value){
       return !value;
     })
     return won;
    }

  render() {
    if(this.state.hasWon){
      return (
        <div className="winner">
          <span className="neon-orange">You</span>
          <span className="neon-blue">Won!</span>
        </div>
      )
    }
    
    return(
      <div>
        <div className="Board-title">
          <span className="neon-orange">Lights</span>
          <span className="neon-blue">Out!</span>
        </div>

        <table className="Board">
         <tbody>
         {this.state.board.map((boardRow, rowNum) => {
          return (<tr key={rowNum}>{boardRow.map((rowElement, colNum) => {
          return <Cell isLit={rowElement} key={`${rowNum}-${colNum}`} flipCellsAroundMe={this.flipCellsAround} cord={`${rowNum}-${colNum}`}/>
          })}</tr>)
        })}
         </tbody>
      </table>
      </div>

    )
  }
}


export default Board;






//   var cellsAround = [[x, y+1], [x, y-1], [x-1, y], [x+1, y]];

//   cellsAround.forEach((cellAround) => {
//     if (cellAround[0] >= 0 && cellAround[0] < numRows && cellAround[1] >= 0 && cellAround[1] < numCols){
//       board[cellAround[0]][cellAround[1]] = ! board[cellAround[0]][cellAround[1]];
//     }
//  })

// [[false, true, false], [true, true, true], [false, true, false]]