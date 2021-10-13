import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: 0.25
    }

    constructor(props) {
        super(props);

        this.state = {
            hasWon: false,
            board: this.createBoard()
        }
    }


    // Creates the state for each cell in the table
    createBoard() {
        let board = [];
        for (let i = 1; i <= this.props.nrows; i++) {
            let row = [];
            for (let j = 1; j <= this.props.ncols; j++) {
                row.push(this.props.chanceLightStartsOn > Math.random());
            }
            board.push(row);
        }

        return board
    }

    // Handles the click on a cell and will change the state of the cell and surrounding cells
    flipCellsAround(coord) {
        let { ncols, nrows } = this.props;
        let board = this.state.board;
        let [x, y] = coord.split("-").map(Number);

        function flipCell(x, y) {
            // Make sure the move is valid before making it
            if ((y >= 0 && y < ncols) && (x >= 0 && x < nrows)) {
                board[x][y] = !board[x][y];
            }
        }

        flipCell(x, y); // Flip cell clicked on
        flipCell(x, y - 1); // Flip left
        flipCell(x, y + 1); // Flip right
        flipCell(x + 1, y); // Flip above
        flipCell(x - 1, y); // Flip below

        // Check to see if every cell is false, if so you win
        let hasWon = board.every(row => row.every(cell => !cell));

        this.setState({ board, hasWon });
    }

    render() {
        // If hasWon then just return a message and stop execution
        if (this.state.hasWon) {
            return <h1><span className="neon-orange">You</span> <span className="neon-blue">Win!</span></h1>
        }

        // Create the markup of the board
        let drawBoard = this.state.board.map((row, rowIdx) => {
            return (
                <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => {
                        let coord = `${rowIdx}-${cellIdx}`;
                        return (
                            <Cell
                            key={coord}
                            isLit={cell}
                            flipCellsAroundMe={() => {this.flipCellsAround(coord)}}
                            />
                        )
                    })}
                </tr>
            )
        })
        return (
            <div>
                <h1 className="Board-title"><span className="neon-orange">Lights</span> <span className="neon-blue">Out!</span></h1>
                <table className="Board">
                    <tbody>
                        {drawBoard}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default Board;
