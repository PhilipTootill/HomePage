import React from 'react';
import './PocketHexes.css';
import HexSvg from './hexagon.svg';

const hexStates = {
    NOT: "not",
    EMPTY: "empty",
    PLACABLE: "placable",
    PLACED: "placed",
    SCORABLE: "scorable",
    SCORED: "scored"
};

class PocketHexesGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            scoredThisRound: false,
            diceToPick: 3,
            diceRolls: [1, 1, 1, 1, 1, 1],
            selectedDice: null,
            grid: this.createGrid()
        }


    }

    componentDidMount() {
    }

    createGrid() {
        var grid = [];

        grid.push(this.createRow(0, 0, 5));
        grid.push(this.createRow(1, 0, 6));
        grid.push(this.createRow(2, 0, 7));
        grid.push(this.createRow(3, 0, 8));
        grid.push(this.createRow(4, 0, 9));
        grid.push(this.createRow(5, 1, 8));
        grid.push(this.createRow(6, 2, 7));
        grid.push(this.createRow(7, 3, 6));
        grid.push(this.createRow(8, 4, 5));

        var centerHex = grid [4][4];
        centerHex.value = 1;
        centerHex.state = hexStates.PLACED;

        return grid;
    }

    createRow(rowNumber, startIndex, length) {
        var row = [];

        for (var i = 0; i < length; i++) {
            row.push(this.createHex(rowNumber, i + startIndex));
        }

        return row;
    }

    createHex(row, index) {
        var hex = {
            value: 20,
            state: hexStates.EMPTY,
            row: row,
            index: index
        };

        return hex;
    }

    getRandomInt(max) {
        return Math.ceil(Math.random() * max);
    }

    selectDice(index) {
        if (this.state.diceToPick === 0) {
            return;
        }

        this.setState({selectedDice: index});

        this.highlightHexes();
    }

    highlightHexes() {
        
    }

    roll() {
        console.log("Rolling!");
    }

    render() {
        return (
            <div className="pocket-hexes-game-container">
                <span className="score">Total score: {this.state.score}</span>
                <div id='grid' className='grid'>
                    {this.state.grid.map((row, index) =>
                        <div key={"row-" + index} className="row">
                            {row.map((hex, jndex) => <div
                                    key={"hex-" + hex.row + "-" + hex.index} 
                                    id={"hex-" + hex.row + "-" + hex.index} 
                                    className="hexagon">
                                    <span>{hex.value}</span>
                                    <img className="hexagonSvg" src={HexSvg}></img>
                                </div>
                            )}
                        </div>

                    )}
                </div>
                <div id='rolls' className='rolls'>
                    {this.state.diceRolls.map((roll, index) =>
                        <div key={"rollBox-" + index} 
                            id={"rollBox-" + index} 
                            className="rollBox" onClick={() => { this.selectDice(index) }}
                            highlighted={index === this.state.selectedDice ? "true" : null}>
                            {roll}
                        </div>
                    )}
                    <button className='rollButton' onClick={() => { this.roll()}}>
                        Dice: {this.state.diceToPick}
                    </button>
                </div>
            </div>
        );
    }
}

export default PocketHexesGame;
