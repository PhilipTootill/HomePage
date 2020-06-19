import React from 'react';
import './PocketHexes.css';
import Hexagon from './Hexagon';

const hexStates = {
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
            diceRolls: this.generateDiceRolls(),
            selectedDice: null,
            grid: this.createGrid()
        }
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
            // Score this hex.
            hex.state = hexStates.SCORED;
            this.setState({
                score: this.state.score + hex.value,
                scoredThisRound: true
            });
            this.updateHexes();
        } else if (hex.state === hexStates.PLACABLE) {
            // Place a value in this hex.
            hex.value = this.state.diceRolls[this.state.selectedDice];
            hex.state = hexStates.PLACED;
            this.spendDice();
            this.updateHexes();
        }
    }

    updateHexes(valueToPlace) {
        for (var rowIndex = 0; rowIndex < this.state.grid.length; rowIndex++) {
            for (var hexIndex = 0; hexIndex < this.state.grid[rowIndex].length; hexIndex++) {
                var hex = this.state.grid[rowIndex][hexIndex];
                
                switch (hex.state) {
                    case hexStates.EMPTY:
                        // May be placeable
                        if (valueToPlace !== null) {
                            this.updateHexForPlacable(hex, valueToPlace);
                        }
                        break;
                    case hexStates.PLACABLE:
                        if (valueToPlace === undefined) {
                            // Chose not to place- clear old data.
                            hex.state = hexStates.EMPTY;
                        } 
                        break;
                    case hexStates.PLACED:
                        // Check if the hex can be scored.
                        this.updateHexForScorable(hex);
                        break;
                    case hexStates.SCORABLE:
                        // Missed opportunity for scoring.
                        hex.state = hexStates.UNSCORABLE;
                        break;
                    default:
                        break;
                }
            }
        }
    }

    updateHexForScorable(hex) {
        var adjList = this.getAdjacentHexes(hex);
    
        if (adjList.length < 6) {
            // Edge hexes can never be scored.
            hex.state = hexStates.UNSCORABLE;
            return;
        }
       
        for (var i = 0; i < adjList.length; i++) {
            if (adjList[i].state === hexStates.EMPTY || adjList[i].state === hexStates.PLACABLE) {
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

    updateHexForPlacable(hex, valueToPlace) {
        if (valueToPlace === 0) {
            //0 can go anywhere.
            hex.state = hexStates.PLACABLE;
            return;
        }

        var highestAdjValue = this.getHighestAdjValue(hex);
        if (valueToPlace === 1) {
            //1 can go anywhere not next to another value
            if (highestAdjValue === null) {
                hex.state = hexStates.PLACABLE;
            }       
            return;
        }

        if (highestAdjValue !== null && valueToPlace >= highestAdjValue) {
            //Other numbers can only go next to lower values.
            hex.state = hexStates.PLACABLE;
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

    handleSelectDice(index) {
        if (this.state.diceToPick === 0) {
            return;
        }

        this.updateHexes(this.state.diceRolls[index]);
        this.setState({selectedDice: index});
    }

    spendDice() {
        this.state.diceRolls[this.state.selectedDice] = null;
        this.setState({
            selectedDice: null,
            diceToPick: parseInt(this.state.diceToPick) - 1
        });
    }

    generateDiceRolls() {
        var diceList = [4, 6, 8, 10, 12, 20];
        var newDiceRolls = [];
        
        for (var i = 0; i < diceList.length; i++) {
            var diceMax = diceList[i];
            var diceResult = Math.ceil(Math.random() * diceMax);
            if (diceMax == 10) {
                diceResult--;
            }
            newDiceRolls.push(diceResult);
        }

        return newDiceRolls;
    }

    rollDice() {
        if (this.state.diceToPick > 0) {
            return;
        }

        this.updateHexes();
        
        var newDiceRolls = this.generateDiceRolls();
        
        this.setState({
            diceRolls: newDiceRolls,
            diceToPick: 3,
            scoredThisRound: false
        });
    }

    render() {
        return (
            <div className="pocket-hexes-game-container">
                <span className="score">Total score: {this.state.score}</span>
                <div id='grid' className='grid'>
                    {this.state.grid.map((row, index) =>
                        <div key={"row-" + index} className="row">
                            {row.map((hex, jndex) => <div onClick={() => { this.handleSelectHex(hex) }}>
                                <Hexagon hex={hex}/>
                            </div>)}
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
                    <button className='rollButton' onClick={() => {this.rollDice()}}>
                        {this.state.diceToPick > 0 ? "Dice: " + this.state.diceToPick : "Roll!"}
                    </button>
                </div>
            </div>
        );
    }
}

export default PocketHexesGame;
