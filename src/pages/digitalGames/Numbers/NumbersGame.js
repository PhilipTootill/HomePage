import React from 'react';
import './Numbers.css';
import { randomInteger } from './NumbersUtils';


class NumbersGame extends React.Component {
    constructor(props) {
        super(props);

        // Set up the initial array for the numbers.
        var numbersArray = [];

        // Pick 4 single digits.
        for (var i = 0; i < 4; i++) {
            numbersArray.push(randomInteger(9, 1, 1));
        }

        // Also add a low multiple of 5 and 25.
        numbersArray.push(randomInteger(25, 10, 5));
        numbersArray.push(randomInteger(100, 25, 25));

        this.state = {
            numbers: numbersArray,
            target: randomInteger(50, 21, 1),
            score: 0,
            movesRemaining: 6,
            highlightedOperation: null,
            highlightedIndex: null,
            errorMessage: ""
        }
    }

    operations = ["+", "-", "X", "/"];

    handleNumberClick(index) {
        if (this.state.highlightedIndex == null) {
            // First click should highlight something
            this.setState({highlightedIndex: index});
        } else if (index == this.state.highlightedIndex) {
            // Clicking same number again cancels.
            this.setState({highlightedIndex: null});
        } else {
            // Second number has been clicked- combine the two.
            var firstNumber = this.state.numbers[this.state.highlightedIndex];
            var secondNumber = this.state.numbers[index];
    
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
                        errorMessage = "Invalid combination- must be a positive number";
                    }
                    break;
                case "X":
                    createdNumber = firstNumber * secondNumber;
                    break;
                case "/":
                    if (firstNumber % secondNumber == 0) {
                        createdNumber = firstNumber / secondNumber;
                    } else {
                        errorMessage = "Invalid combination- not a whole number";
                    }
                    break;
                default:
                    break;
            }

            if (!createdNumber) {
                this.setState({
                    errorMessage: errorMessage,
                    highlightedIndex: null,
                    highlightedOperation: null
                });

                return;
            }
    
            var newNumbersArray = this.state.numbers.splice(0, 6);
            newNumbersArray.splice(index, 1, createdNumber);
            newNumbersArray.splice(this.state.highlightedIndex, 1, randomInteger(9, 1, 1));
    
            this.setState({
                numbers: newNumbersArray,
                movesRemaining: this.state.movesRemaining - 1,
                highlightedIndex: null,
                highlightedOperation: null,
                errorMessage: ""
            });
    
            if (createdNumber == this.state.target) {
                var bonusMoves = 3;

                this.setState({
                    score: this.state.score + 1,
                    target: this.setNewTarget(),
                    movesRemaining: this.state.movesRemaining + bonusMoves
                });
            }
        }
    }

    setNewTarget() {
        // Every time the player scores a point, the range of the target increases.
        const minIncrease = 5;
        const maxIncrease = 10;
        const baseMin = 30;
        const baseMax = 60;
        const min = baseMin + this.state.score ** 2 * minIncrease;
        const max = baseMax + this.state.score ** 2 * maxIncrease;

        return randomInteger(max, min, 1);
    }

    handleOperationClick(operation) {
        if (operation == this.state.highlightedOperation) {
            this.setState({highlightedOperation: null});
        } else {
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
                            highlighted={index == this.state.highlightedIndex ? "true" : null}>
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
                    <p>Score: {this.state.score}</p>
                    <p>Moves Remaining: {this.state.movesRemaining}</p>
                </div>
                <div className="error-container">
                    <p>{this.state.errorMessage}</p>
                </div>
            </div>
        );
    }
}

export default NumbersGame;
