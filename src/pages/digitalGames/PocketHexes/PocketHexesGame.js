import React from 'react';
import './PocketHexes.css';
import HexSvg from './hexagon.svg';

const hexStates = {
    NOT: "not",
    EMPTY: "empty",
    PLACABLE: "placable",
    PLACED: "placed",
    SCORABLE: "scorable",
    UNSCORABLE: "unscorable",
    SCORED: "scored"
};

class PocketHexesGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            scoredThisRound: false,
            diceToPick: 3,
            diceRolls: [1, 2, 3, 4, 5, 1],
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
            value: null,
            state: hexStates.EMPTY,
            row: row,
            index: index
        };

        return hex;
    }

    handleSelectHex(hex) {
        if (!this.state.scoredThisRound && hex.state === hexStates.SCORABLE) {
            hex.state = hexStates.SCORED;
            this.setState({
                score: this.score + parseInt(hex.value),
                scoredThisRound: true
            });
            this.clearHexes();
        } else if (hex.state === hexStates.PLACABLE) {
            hex.value = this.state.diceRolls[this.state.selectedDice];
            this.useDice();
            this.checkForScoring(hex);
            this.clearHexes();
        }
    }

    highlightHexes(valueToPlace) {
        this.clearHexes();

        // Walk through the hex array, looking for hexes where the value could be placed.
        for (var rowIndex = 0; rowIndex < this.state.grid.length; rowIndex++) {
            for (var hexIndex = 0; hexIndex < this.state.grid[rowIndex].length; hexIndex++) {
                var hex = this.state.grid[rowIndex][hexIndex];
                
                if (hex.value !== null) {
                    //Hex is full- definitely can't place.
                    continue;
                }

                if (valueToPlace === 0) {
                    //0 can go anywhere.
                    hex.state = hexStates.PLACABLE;
                    continue;
                }

                var highestAdjValue = this.getHighestAdjValue(hex);
                if (highestAdjValue === null && valueToPlace === 1) {
                    //1 can go anywhere not next to another value
                    hex.state = hexStates.PLACABLE;
                }

                if (highestAdjValue !== null && valueToPlace > highestAdjValue) {
                    //Other numbers can only go next to lower values.
                    hex.state = hexStates.PLACABLE;
                }
            }
        }
    }

    getHighestAdjValue(hex) {
        var adjHexes = this.getAdjacentHexes(hex);
        var highestAdjValue = null;

        for (var i = 0; i < adjHexes.length; i++) {
            var adjHex = adjHexes[i];

            if (adjHex.value === null) {
                continue;
            } else {
                highestAdjValue = Math.max(adjHex.value, highestAdjValue);
            }
        }

        return highestAdjValue;
    }

    getAdjacentHexes(targetHex) {
        var adjHexes = [];

        /* The hex grid indexing is tricky. Imagine the Y axis is tilted by 30 degrees clockwise.
        * So, the first five rows start indexing hexes at 0, as expected.
        * For later rows, the row size is decreasing, so the sixth row doesn't have a hex at 0.
        * The seventh row is missing a hex at 0 and 1, and so forth.
        * 
        * As a result, we'll need to look at each hex's index property defined during setup, and
        * can't rely on the index in the array.
        */

        // First, try and get hexes on the same row.
        var sameRow = this.state.grid[targetHex.row];
        var i;
        for (i = 0; i < sameRow.length; i++) {
            var sameRowHex = sameRow[i];

            if (sameRowHex.index === targetHex.index - 1) {
                adjHexes.push(sameRowHex);
            } else if (sameRowHex.index === targetHex.index + 1) {
                adjHexes.push(sameRowHex);
            } 
        }

        // Now look at the row above.
        if (targetHex.row !== 0) {
            var rowAbove = this.state.grid[targetHex.row - 1];

            for (i = 0; i < rowAbove.length; i++) {
                var rowAboveHex = rowAbove[i];
    
                if (rowAboveHex.index === targetHex.index - 1) {
                    adjHexes.push(rowAboveHex);
                } else if (rowAboveHex.index === targetHex.index) {
                    adjHexes.push(rowAboveHex);
                } 
            }
        }

        // Now look at the row below.
        if (targetHex.row !== this.state.grid.length - 1) {
            var rowBelow = this.state.grid[targetHex.row + 1];

            for (i = 0; i < rowBelow.length; i++) {
                var rowBelowHex = rowBelow[i];
    
                if (rowBelowHex.index === targetHex.index) {
                    adjHexes.push(rowBelowHex);
                } else if (rowBelowHex.index === targetHex.index + 1) {
                    adjHexes.push(rowBelowHex);
                } 
            }
        }

        return adjHexes;
    }

    clearHexes() {
        for (var rowIndex = 0; rowIndex < this.state.grid.length; rowIndex++) {
            for (var hexIndex = 0; hexIndex < this.state.grid[rowIndex].length; hexIndex++) {
                var hex = this.state.grid[rowIndex][hexIndex];
                
                if (hex.state === hexStates.PLACABLE) {
                    hex.state = hexStates.EMPTY
                } else if (hex.state === hexStates.SCORABLE) {
                    hex.state = hexStates.UNSCORABLE;
                }
            }
        }
    }

    checkForScoring(hex) {
        if (hex.state !== hexStates.PLACED) {
            return;
        }

        var adjList = this.getAdjacentHexes(hex);
    
        if (adjList.length < 6) {
            // Edge hexes can never be scored.
            hex.state = hexStates.UNSCORABLE;
            return;
        }
       
        for (var i = 0; i < adjList.length; i++) {
            if (adjList[i].state === hexStates.EMPTY) {
                // Found an adjacent empty hex, can't be scored yet.
                return;
            }
        }
        
        if (this.state.scoredThisRound) {
            hex.state = hexStates.UNSCORABLE;
        } else {
            hex.state = hexStates.SCORABLE;
        }
    }

    handleSelectDice(index) {
        if (this.state.diceToPick === 0) {
            return;
        }

        this.highlightHexes(this.state.diceRolls[index]);
        this.setState({selectedDice: index});
    }

    useDice() {
        this.state.diceRolls[this.state.selectedDice] = null;
        this.setState({
            selectedDice: null,
            diceToPick: parseInt(this.state.diceToPick) - 1
        });
    }

    roll() {
        console.log("Rolling!");
    }

    getRandomInt(max) {
        return Math.ceil(Math.random() * max);
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
                                    className="hexagon" onClick={() => { this.handleSelectHex(hex) }}
                                    hexstate={hex.state}>
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
                            className="rollBox" onClick={() => { this.handleSelectDice(index) }}
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
