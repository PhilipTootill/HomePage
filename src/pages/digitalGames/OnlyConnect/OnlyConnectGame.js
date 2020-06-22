import React from 'react';
import './OnlyConnect.css';
import { shuffleArray } from '../DigitalGamesUtils';
import OnlyConnectTimer from './OnlyConnectTimer';

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
            answerList: answers,
            timerExpired: false,
            message: false,
            gameWon: false
        }
    }

    boxClickHandler(answer) {
        if (this.state.timerExpired ||
            this.state.solvedAnswers.indexOf(answer)>= 0) {
            return;
        }

        var answerIndex = this.state.highlightedAnswers.indexOf(answer);
        if (answerIndex >= 0) {
            this.state.highlightedAnswers.splice(answerIndex, 1);
        } else {
            this.state.highlightedAnswers.push(answer);
        }

        if (this.state.highlightedAnswers.length === 4) {
            setTimeout(()=> {this.checkAnswers()}, 500);
        }

        this.setState({
            highlightedAnswers: this.state.highlightedAnswers,
            message: null
        })
    }

    checkAnswers() {
        var message;
        var rowsCorrect = this.state.solvedAnswers.length / 4;

        if (this.isAnswerCorrect()) {
            this.markAnswersAsCorrect();
            message = "Correct!";
            if (rowsCorrect === 2) {
                setTimeout(() => {this.revealAnswers()}, 500);
                message = "Well done! You got all 4 points for the groups. There's another point for getting each connection."
            }
        } else {
            message = "Incorrect! That's not a group.";
        }

        this.setState({
            highlightedAnswers: [],
            message: message
        })
    }

    isAnswerCorrect() {
        var answerIsCorrect = false;

        for (var i = 0; i < this.state.answerList.length; i++) {
            if (this.arraysMatch(this.state.highlightedAnswers, this.state.answerList[i])) {
                answerIsCorrect = true;
            }
        }

        return answerIsCorrect;
    }

    markAnswersAsCorrect() {
        for (var i = 0; i < this.state.highlightedAnswers.length; i++) {
            var answer = this.state.highlightedAnswers[i];
            this.state.solvedAnswers.push(answer);

            var answerIndex = this.state.unsolvedAnswers.indexOf(answer);
            this.state.unsolvedAnswers.splice(answerIndex, 1);
        }
    }

    revealAnswers() {
        this.setState({
            solvedAnswers: this.state.solvedAnswers.concat(this.state.unsolvedAnswers),
            unsolvedAnswers: []
        })
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

    timerExpires() {
        var rowsCorrect = this.state.solvedAnswers.length / 4;

        this.setState({
            highlightedAnswers: [],
            timerExpired: true,
            message: "You're out of time! That's " + rowsCorrect + " points for the groups. Remember, there's a bonus point for getting the connections."
        })
    }

    render() {
        var answerGrid = this.splitAnswersIntoGrid();
        var rowsCorrect = this.state.solvedAnswers.length / 4;

        return (
            <div className="only-connect-game-container">
                <div id='grid' className='only-connect-grid' rowscorrect={rowsCorrect}>
                    {answerGrid.map((row, rowIndex) =>
                        <div
                            key={"grid-row-" + rowIndex} 
                            id={"grid-row-" + rowIndex} 
                            className="only-connect-grid-row"
                            solved={rowIndex < rowsCorrect ? "true": null}>
                            {row.map((boxText, columnIndex) =>
                                <div
                                    key={"box-" + rowIndex + "-" + columnIndex} 
                                    id={"box-" + rowIndex + "-" + columnIndex} 
                                    className="only-connect-grid-box"
                                    onClick={()=>{this.boxClickHandler(boxText)}}
                                    highlighted={this.state.highlightedAnswers.includes(boxText) ? "true" : null}>
                                    {boxText}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <OnlyConnectTimer callback={() => {this.timerExpires()}}/>
                <div className="only-connect-message-box">
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default OnlyConnectGame;
