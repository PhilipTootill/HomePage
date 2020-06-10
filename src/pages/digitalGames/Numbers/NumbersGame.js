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
            // Second number clicked- combine the two.
            var firstIndex = Math.min(index, this.state.highlightedIndex);
            var secondIndex = Math.max(index, this.state.highlightedIndex);
            var firstNumber = this.state.numbers[this.state.highlightedIndex];
            var secondNumber = this.state.numbers[index];
    
            var createdNumber;
    
            switch (this.state.highlightedOperation) {
                case "+":
                    createdNumber = firstNumber + secondNumber;
                    break;
                case "-":
                    if (secondNumber > firstNumber) {
                        this.setState({
                            errorMessage: "Invalid combination- must be a positive number",
                            highlightedIndex: null,
                            highlightedOperation: null
                        });
                        return;
                    }
                    createdNumber = firstNumber - secondNumber;
                    break;
                case "X":
                    createdNumber = firstNumber * secondNumber;
                    break;
                case "/":
                    if (firstNumber % secondNumber == 0) {
                        createdNumber = firstNumber / secondNumber;
                    } else {
                        this.setState({
                            errorMessage: "Invalid combination- not a whole number",
                            highlightedIndex: null,
                            highlightedOperation: null
                        });
                        return;
                    }
                    break;
                default:
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
                    target: randomInteger(50, 21, 1),
                    movesRemaining: this.state.movesRemaining + bonusMoves
                });
            }
        }
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
            <div>
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
                <p>Target: {this.state.target}</p>
                <p>Score: {this.state.score}</p>
                <p>Moves Remaining: {this.state.movesRemaining}</p>
                <p>Error: {this.state.errorMessage}</p>
            </div>
        );
    }
}

export default NumbersGame;
