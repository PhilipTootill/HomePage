import React from 'react';
import './Numbers.css';
import { randomInteger } from './NumbersUtils';


class NumbersGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: [],
            target: 0,
            score: 0,
            movesRemaining: 0,
            highlightedOperation: null,
            highlightedIndex: null,
            errorMessage: "",
            gameOver: false
        }

        setTimeout(this.restartGame, 0);
    }

    restartGame = () => {
        // Set up the initial array for the numbers.
        var numbersArray = [];

        // Pick 4 single digits.
        for (var i = 0; i < 4; i++) {
            numbersArray.push(randomInteger(9, 1, 1));
        }

        // Also add a low multiple of 5 and 25.
        numbersArray.push(randomInteger(25, 10, 5));
        numbersArray.push(randomInteger(100, 25, 25));

        var target;

        do {
            target = randomInteger(50, 21, 1);
        } while (numbersArray.includes(target));

        this.setState({
            numbers: numbersArray,
            target: target,
            score: 0,
            movesRemaining: 6,
            highlightedOperation: null,
            highlightedIndex: null,
            errorMessage: "",
            gameOver: false
        });
    }

    operations = ["+", "-", "X", "/"];

    handleNumberClick(clickedIndex) {
        if (this.state.gameOver) {
            return;
        } else if (clickedIndex == this.state.highlightedIndex) {
            // Clicking same number again cancels.
            this.setState({highlightedIndex: null});
        } else if (this.state.highlightedOperation != null && this.state.highlightedIndex != null) {
            // We have a number and an operation, so make a move.
            this.makeMove(clickedIndex);
        } else {
            // Highlight the number.
            this.setState({highlightedIndex: clickedIndex});
        }
    }

    makeMove = (clickedIndex) => {
        var firstNumber = this.state.numbers[this.state.highlightedIndex];
        var secondNumber = this.state.numbers[clickedIndex];

        var createdNumber = this.performOperation(firstNumber, secondNumber);

        if (!createdNumber) {
            // Error message state set in performOperation
            return;
        }

        var newNumbersArray = [...this.state.numbers];

        // Put the new number in where the user clicked.
        newNumbersArray.splice(clickedIndex, 1, createdNumber);

        // Add a new random number in the used up space.
        newNumbersArray.splice(this.state.highlightedIndex, 1, this.pickNewRandomNumber());

        var movesRemaining = this.state.movesRemaining - 1
        this.setState({
            movesRemaining: movesRemaining,
            numbers: newNumbersArray,
            errorMessage: "",
            highlightedIndex: null,
            highlightedOperation: null
        });

        if (createdNumber == this.state.target) {
            this.updateTarget();
        } else if (movesRemaining === 0) {
            this.endGame();
        }
    }

    performOperation = (firstNumber, secondNumber) => {
        var createdNumber;
        var errorMessage;

        switch (this.state.highlightedOperation) {
            case "+":
                createdNumber = firstNumber + secondNumber;
                break;
            case "-":
                if (firstNumber > secondNumber) {
                    createdNumber = firstNumber - secondNumber;
                } else {
                    errorMessage = "Must be a positive number!";
                }
                break;
            case "X":
                createdNumber = firstNumber * secondNumber;
                break;
            case "/":
                if (firstNumber % secondNumber == 0) {
                    createdNumber = firstNumber / secondNumber;
                } else {
                    errorMessage = "Must be a whole number!";
                }
                break;
            default:
                errorMessage = "Must select an operation!";
                break;
        }

        if (createdNumber > 999999) {
            errorMessage = "Number is too big!"
            createdNumber = null;
        }
     
        if (errorMessage) {
            this.setState({
                errorMessage: errorMessage,
                highlightedIndex: null,
                highlightedOperation: null
            });
        }

        return createdNumber;
    }

    pickNewRandomNumber = () => {
        return randomInteger(9, 1, 1);
    }

    updateTarget = () => {
        const minIncrease = 5;
        const maxIncrease = 10;
        const baseMin = 30;
        const baseMax = 60;
        const min = baseMin + this.state.score ** 2 * minIncrease;
        const max = baseMax + this.state.score ** 2 * maxIncrease;

        var newTarget;

        do {
            newTarget = randomInteger(max, min, 1);
            if (this.state.numbers.includes(newTarget)) {
                console.log("REPEAT- tried to set " + newTarget);
            }
        } while (this.state.numbers.includes(newTarget));

        var bonusMoves = 3;

        this.setState({
            score: this.state.score + 1,
            target: newTarget,
            movesRemaining: this.state.movesRemaining + bonusMoves,
        });
    }

    endGame = () => {
        this.setState({gameOver: true});
    }

    handleOperationClick(operation) {
        if (this.state.gameOver) {
            return;
        }

        if (operation === this.state.highlightedOperation) {
            this.setState({highlightedOperation: null});
        } else if (this.state.highlightedIndex !== null) {
            this.setState({highlightedOperation: operation});
        }
    }

    render() {
        return (
            <div className="numbers-game-container">
                <div className="target-container">
                    <p className="target-container-label">Target:</p>
                    <p className="target-text">{this.state.target}</p>
                </div>
                <div className="number-box-container">
                    {this.state.numbers.map((number, index) =>
                        <div className="number-box" onClick={() => { this.handleNumberClick(index) }}
                            highlighted={index == this.state.highlightedIndex ? "true" : null}
                            smallText={number > 999 ? "true" : null}>
                            {number}
                        </div>
                    )}
                </div>
                <div className="operation-box-container">
                    {this.operations.map((operation) =>
                        <div className="operation-box" onClick={() => { this.handleOperationClick(operation) }}
                            highlighted={operation == this.state.highlightedOperation ? "true" : null}>
                            {operation}
                        </div>
                    )}
                </div>
                <div className="information-container"> 
                    <div className="play-stats">
                        <p>Score: {this.state.score}</p>
                        <p>Moves Remaining: {this.state.movesRemaining}</p>
                    </div>
                    <div show={this.state.errorMessage != "" ? "true" : null} className="error-container">
                        <p>{this.state.errorMessage}</p>
                    </div>
                    <div show={this.state.gameOver ? "true" : null} className="endgame-container">
                        <p>No more moves!</p>
                        <button class="play-again-button" onClick={this.restartGame}>Play again?</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NumbersGame;
