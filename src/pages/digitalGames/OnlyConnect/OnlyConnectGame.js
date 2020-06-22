import React from 'react';
import './OnlyConnect.css';
import { shuffleArray } from '../DigitalGamesUtils';
import OnlyConnectTimer from './OnlyConnectTimer';
import OnlyConnectGrid from './OnlyConnectGrid';

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
            gameOver: false,
            correctAnswers: 0
        }
    }

    boxClickHandler = (answer) => {
        if (this.state.gameOver ||
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
        var rowsCorrect = this.state.correctAnswers;

        var answer = this.findAndPopMatchingAnswer();
        if (answer) {
            this.markHighlightedBoxesAsCorrect();
            message = "Correct!";
            rowsCorrect++;
            if (rowsCorrect === 3) {
                this.revealAnswers();
                rowsCorrect++;
                message = "Well done! You got all 4 points for the groups. There's another point for getting each connection."
            }
        } else {
            message = "Incorrect! That's not a group.";
        }

        this.setState({
            highlightedAnswers: [],
            message: message,
            correctAnswers: rowsCorrect
        })
    }

    findAndPopMatchingAnswer() {
        for (var i = 0; i < this.state.answerList.length; i++) {
            if (this.arraysMatch(this.state.highlightedAnswers, this.state.answerList[i])) {
                return this.state.answerList.splice(i, 1);
            }
        }

        return null;
    }

    markHighlightedBoxesAsCorrect() {
        for (var i = 0; i < this.state.highlightedAnswers.length; i++) {
            var answer = this.state.highlightedAnswers[i];
            this.state.solvedAnswers.push(answer);

            var answerIndex = this.state.unsolvedAnswers.indexOf(answer);
            this.state.unsolvedAnswers.splice(answerIndex, 1);
        }
    }

    revealAnswers() {
        setTimeout(()=> {this.setState({
            solvedAnswers: this.state.solvedAnswers.concat(this.state.answerList.flat()),
            unsolvedAnswers: [],
            gameOver: true
        })}, 500);
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

    timerExpires() {
        var pointsString = this.state.correctAnswers + (this.state.correctAnswers === 1 ? " point" : " points");

        this.setState({
            highlightedAnswers: [],
            gameOver: true,
            message: "You're out of time! That's " + pointsString + " for the groups. Remember, there's a bonus point for getting the connections."
        })

        this.revealAnswers();
    }

    render() {
        return (
            <div className="only-connect-game-container">
                <OnlyConnectGrid 
                    correctAnswers={this.state.solvedAnswers} remainingAnswers={this.state.unsolvedAnswers}
                    highlightedAnswers={this.state.highlightedAnswers} boxClickHandler={this.boxClickHandler}/>
                <OnlyConnectTimer forceend={this.state.gameOver} callback={() => {this.timerExpires()}}/>
                <div className="only-connect-message-box">
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default OnlyConnectGame;
