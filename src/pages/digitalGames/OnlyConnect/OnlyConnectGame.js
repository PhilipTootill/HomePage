import React from 'react';
import './OnlyConnect.css';
import { shuffleArray, arraysMatch } from '../DigitalGamesUtils';
import OnlyConnectTimer from './OnlyConnectTimer';
import OnlyConnectGrid from './OnlyConnectGrid';
import OnlyConnectLives from './OnlyConnectLives';

class OnlyConnectGame extends React.Component {
    constructor(props) {
        super(props);

        var unsolvedAnswers = props.answers.flat(1);
        shuffleArray(unsolvedAnswers);

        this.state = {
            unsolvedAnswers: unsolvedAnswers,
            solvedAnswers: [],
            highlightedAnswers: [],
            answerList: props.answers,
            message: false,
            gameOver: false,
            score: 0,
            livesRemaining: 0
        }
    }

    boxClickHandler = (answer) => {
        if (this.state.gameOver ||
            this.state.solvedAnswers.indexOf(answer)>= 0) {
            return;
        }

        var highlightedAnswerIndex = this.state.highlightedAnswers.indexOf(answer);
        if (highlightedAnswerIndex >= 0) {
            this.state.highlightedAnswers.splice(highlightedAnswerIndex, 1);
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
        var score = this.state.score;
        var lives = this.state.livesRemaining;

        var answer = this.findAndPopMatchingAnswer();
        if (answer) {
            this.moveHighlightedBoxesToSolved();
            message = "Correct!";
            score++;
            if (this.state.answerList.length === 2) {
                lives = 3;
                message = "Correct! Remember, you only get 3 chances to guess the last groups."
            } else if (this.state.answerList.length === 1) {
                this.revealAnswers();
                score++;
                message = "Well done! You got all " + score + " points for the groups. There's another point for getting each connection."
            }
        } else {
            message = "Incorrect! That's not a group.";

            if (lives > 0) {
                lives--;
                
                if (lives === 2) {
                    message = "Incorrect! Two lives remain.";
                } else if (lives === 1) {
                    message = "Incorrect! Only one life left."
                } else if (lives === 0) {
                    message = "Game over! You get " + this.state.score + " points from the groups. You can still get a bonus point for each connection you get."
                    this.revealAnswers();
                }
                
            }
        }

        this.setState({
            highlightedAnswers: [],
            message: message,
            score: score,
            livesRemaining: lives
        })
    }

    findAndPopMatchingAnswer() {
        for (var i = 0; i < this.state.answerList.length; i++) {
            if (arraysMatch(this.state.highlightedAnswers, this.state.answerList[i])) {
                return this.state.answerList.splice(i, 1);
            }
        }

        return null;
    }

    moveHighlightedBoxesToSolved() {
        for (var i = 0; i < this.state.highlightedAnswers.length; i++) {
            var answer = this.state.highlightedAnswers[i];
            this.state.solvedAnswers.push(answer);

            var answerIndex = this.state.unsolvedAnswers.indexOf(answer);
            this.state.unsolvedAnswers.splice(answerIndex, 1);
        }
    }

    revealAnswers() {
        setTimeout(()=> {
            this.setState({
                solvedAnswers: this.state.solvedAnswers.concat(this.state.answerList.flat()),
                unsolvedAnswers: [],
                answerList: [],
                gameOver: true
            })
        }, 500);
    }

    timerExpires = () => {
        var pointsString = this.state.score + (this.state.score === 1 ? " point" : " points");

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
                <div className="only-connect-info-box">
                    <OnlyConnectLives count={this.state.livesRemaining}/>
                    <OnlyConnectTimer forceEnd={this.state.gameOver} expiredCallback={this.timerExpires}/>
                </div>
                <div className="only-connect-message-box">
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default OnlyConnectGame;
