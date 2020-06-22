import React from 'react';
import './OnlyConnect.css';
import { shuffleArray } from '../DigitalGamesUtils';

class OnlyConnectGame extends React.Component {
    constructor(props) {
        super(props);

        // If you say 'good names for rhinoceroses' as a link, you get 5 bonus points!
        const answers = [
            ["Apple", "Adam", "Ants", "Anorak"],
            ["Banana", "Badger", "Bert", "Basic"],
            ["Cave", "Coast", "Cliff", "Container"],
            ["Day", "Dessert", "Dave", "Depot"]
        ]

        var unsolvedAnswers = answers.flat(1);
        shuffleArray(unsolvedAnswers);

        this.state = {
            unsolvedAnswers: unsolvedAnswers,
            solvedAnswers: [],
            highlightedAnswers: [],
            answerList: answers
        }
    }

    boxClickHandler(answer) {
        var answerIndex = this.state.highlightedAnswers.indexOf(answer);

        if (answerIndex >= 0) {
            this.state.highlightedAnswers.splice(answerIndex, 1);
        } else {
            this.state.highlightedAnswers.push(answer);
        }

        if (this.state.highlightedAnswers.length === 4) {
            if (this.checkAnswers()) {
                this.markAnswersAsCorrect();
            } else {
                console.log("Wrong!");
            }

            this.state.highlightedAnswers.splice(0, 4);
        }

        this.setState({
            highlightedAnswers: this.state.highlightedAnswers
        })
    }

    checkAnswers() {
        for (var i = 0; i < this.state.answerList.length; i++) {
            if (this.arraysMatch(this.state.highlightedAnswers, this.state.answerList[i])) {
                return true;
            }
        }

        return false;
    }

    markAnswersAsCorrect() {
        for (var i = 0; i < this.state.highlightedAnswers.length; i++) {
            var answer = this.state.highlightedAnswers[i];
            this.state.solvedAnswers.push(answer);

            var answerIndex = this.state.unsolvedAnswers.indexOf(answer);
            this.state.unsolvedAnswers.splice(answerIndex, 1);
        }
    }

    arraysMatch(arr1, arr2) {
        arr1.sort();
        arr2.sort();

        // Check if the arrays are the same length
        if (arr1.length !== arr2.length) return false;
    
        // Check if all items exist and are in the same order
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }

    splitAnswersIntoGrid() {
        var correctAnswers = this.state.solvedAnswers.slice();
        var remainingAnswers = this.state.unsolvedAnswers.slice();
        var allAnswers = correctAnswers.concat(remainingAnswers);

        var answerGrid = [
            allAnswers.slice(0, 4),
            allAnswers.slice(4, 8),
            allAnswers.slice(8, 12),
            allAnswers.slice(12),
        ];

        return answerGrid;
    }

    render() {
        var answerGrid = this.splitAnswersIntoGrid();
        var rowsCorrect = this.state.solvedAnswers.length / 4;

        return (
            <div className="only-connect-game-container">
                <div id='grid' className='grid' rowscorrect={rowsCorrect}>
                    {answerGrid.map((row, rowIndex) =>
                        <div
                            key={"grid-row-" + rowIndex} 
                            id={"grid-row-" + rowIndex} 
                            className="grid-row"
                            solved={rowIndex < rowsCorrect ? "true": null}>
                            {row.map((boxText, columnIndex) =>
                                <div
                                    key={"box-" + rowIndex + "-" + columnIndex} 
                                    id={"box-" + rowIndex + "-" + columnIndex} 
                                    className="grid-box"
                                    onClick={()=>{this.boxClickHandler(boxText)}}
                                    highlighted={this.state.highlightedAnswers.includes(boxText) ? "true" : null}>
                                    {boxText}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default OnlyConnectGame;
