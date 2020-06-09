import React from 'react';
import './Numbers.css';

class NumbersGame extends React.Component {
    constructor(props) {
        super(props);

        var numbersArray = [];
        for (var i = 0; i < 4; i++) {
            numbersArray.push(this.randomInteger(9, 1, 1));
        }

        numbersArray.push(this.randomInteger(25, 10, 5));
        numbersArray.push(this.randomInteger(100, 25, 25));

        this.state = {
            numbers: numbersArray,
            target: this.randomInteger(50, 21, 1),
            score: 0,
            movesRemaining: 6,
            highlightedOperation: null,
            highlightedIndex: null
        }
    }

    operations = ["+", "-", "X", "/"];

    /*
    * Return a random multiple of an integer, up to a set maximum.
    */
    randomInteger(max, min, multiple) {
        //Scale everything down by the multiplier.
        var scaledMax = Math.floor(max / multiple);
        var scaledMin = Math.ceil(min / multiple);
        var range = scaledMax - scaledMin;

        var random;
        random = Math.random(); //Between 0 and 1.
        random = random * range; // Between 0 and range.
        random = Math.round(random); //Integer between 0 and range
        random = random + scaledMin; //Integer between scaledMin and scaledMax
        random = random * multiple; //Multiple between min and max.

        return random;
    }

    handleNumberClick(index) {
        if (this.state.highlightedIndex == null) {
            this.setState({highlightedIndex: index});
        } else if (index == this.state.highlightedIndex) {
            this.setState({highlightedIndex: null});
        } else {
            var firstIndex = Math.min(index, this.state.highlightedIndex);
            var secondIndex = Math.max(index, this.state.highlightedIndex);
            var firstNumber = Math.max(this.state.numbers[firstIndex], this.state.numbers[secondIndex]);
            var secondNumber = Math.min(this.state.numbers[firstIndex], this.state.numbers[secondIndex]);
    
            var createdNumber;
    
            switch (this.state.highlightedOperation) {
                case "+":
                    createdNumber = firstNumber + secondNumber;
                    break;
                case "-":
                    createdNumber = firstNumber - secondNumber;
                    break;
                case "X":
                    createdNumber = firstNumber * secondNumber;
                    break;
                case "/":
                    if (firstNumber % secondNumber == 0) {
                        createdNumber = firstNumber / secondNumber;
                    } else {
                        return;
                    }
                    break;
                default:
                    return;
            }
    
            var newNumbersArray = this.state.numbers.splice(0, 6);
            newNumbersArray.splice(firstIndex, 1);
            newNumbersArray.splice(secondIndex - 1, 1); //secondIndex has shifted by removal.
    
            newNumbersArray.splice(index, 0, createdNumber);
            newNumbersArray.push(this.randomInteger(9, 1, 1));
    
            this.setState({
                numbers: newNumbersArray,
                highlightedIndex: null,
                highlightedOperation: null
            });
    
            if (createdNumber == this.state.target) {
                this.setState({
                    score: this.state.score + 1,
                    target: this.randomInteger(50, 21, 1)
                });
            }
        }
    }

    handleOperationClick(operation) {
        this.setState({highlightedOperation: operation});
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
                <p>Target is: {this.state.target}</p>
            </div>
        );
    }
}

export default NumbersGame;
