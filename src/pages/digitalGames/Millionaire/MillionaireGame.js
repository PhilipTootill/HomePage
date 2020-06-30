import React from 'react';
import './Millionaire.css';
import { shuffleArray, arraysMatch } from '../DigitalGamesUtils';
import MillionaireMainPanel from './MillionaireMainPanel';
import MillionaireSidePanel from './MillionaireSidePanel';
import { pointsList, lifelines, sideButtons } from './MillionaireConstants';

class MillionaireGame extends React.Component {
    constructor(props) {
        super(props);

        this.questions = props.answers;

        for (var i = 0; i < this.questions.length; i++) {
            shuffleArray(this.questions[i].answers);
        }

        this.state = {
            message: "Good luck! Here's question one.",
            questionIndex: 0,
            scoreIndex: -1,
            lifelines: [lifelines.FIFTYFIFTY, lifelines.ASKA, lifelines.ASKB],
            gameOver: false,
            finalScoreIndex: -1,
            highlightedAnswer: null,
            greenButtonText: sideButtons.NONE,
            redButtonText: sideButtons.NONE
        }
    }

    highlightQuestion = (answer) => {
        if (this.state.greenButtonText !== sideButtons.NONE && 
            this.state.greenButtonText !== sideButtons.CONFIRM) {
            return;
        }

        if (answer === this.state.highlightedAnswer) {
            this.setState({
                highlightedAnswer: null,
                message: null,
                greenButtonText: sideButtons.NONE
            })
        } else {
            this.setState({
                highlightedAnswer: answer,
                message: "Are you sure?",
                greenButtonText: sideButtons.CONFIRM,
                redButtonText: sideButtons.RETHINK
            })
        }
    };

    clearAnswer = () => {
        this.setState({
            message: "Take your time. You can still walk away.",
            highlightedAnswer: null,
            greenButtonText: sideButtons.NONE,
            redButtonText: sideButtons.WALKAWAY
        })
    }

    submitAnswer = () => {
        var correctAnswer = this.questions[this.state.questionIndex].correctAnswer;

        if (this.state.highlightedAnswer === correctAnswer) {
            var finalScoreIndex = this.state.finalScoreIndex;

            if (this.state.questionIndex % 4 === 3) {
                finalScoreIndex = this.state.questionIndex;
            }

            this.setState({
                message: "Correct! Get ready for the next question.",
                finalScoreIndex: finalScoreIndex,
                greenButtonText: sideButtons.CONTINUE,
                redButtonText: sideButtons.NONE
            })
        } else {
            var nextButton = sideButtons.CONTINUE;

            if (!this.state.gameOver) {
                nextButton = sideButtons.OHNO;
            }

            this.setState({
                message: "I'm sorry, that's not the answer! The correct answer was " + correctAnswer + ".",
                gameOver: true,
                greenButtonText: nextButton,
                redButtonText: sideButtons.NONE
            })
        }
    }

    incorrectAnswerSubmitted = () => {
        this.setState({
            scoreIndex: this.state.finalScoreIndex
        });

        this.displayFinalScoreAndContinue();
    }

    displayFinalScoreAndContinue = () => {
        var finalScoreString = "0 points";

        if (this.state.finalScoreIndex >= 0) {
            finalScoreString = pointsList[this.state.finalScoreIndex];
        }
        this.setState({
            message: "You got " + finalScoreString + " for the round. You can do the rest of the questions while you wait.",
            greenButtonText: sideButtons.CONTINUE
        })
    }

    continueWithRound = () => {
        var scoreIndex = this.state.scoreIndex;

        if (!this.state.gameOver) {
            scoreIndex++;
        }

        this.setState({
            questionIndex: this.state.questionIndex + 1,
            scoreIndex: scoreIndex,
            message: null,
            greenButtonText: sideButtons.NONE,
            redButtonText: sideButtons.WALKAWAY,
            highlightedAnswer: null
        });
    }

    lifelineFiftyFifty = () => {
        console.log('TODO: fifty fifty');
    }

    lifelineAsk = (button) => {
        console.log('TODO: Ask ' + button);
    }

    walkAwayPrompt = () => {
        var finalScore = pointsList[this.state.questionIndex - 1]

        this.setState({
            message: "Are you sure you want to walk away with " + finalScore + " points?",
            greenButtonText: sideButtons.WALKAWAYCONF,
            redButtonText: sideButtons.WALKAWAYCANCEL
        });
    }
    
    walkAwayConfirm = () => {
        var finalScore = pointsList[this.state.questionIndex - 1]

        this.setState({
            gameOver: true,
            finalScore: finalScore,
            message: "You get " + finalScore + " points for the round! You can keep going while you wait.",
            greenButtonText: sideButtons.CONTINUE
        });
    }

    walkAwayCancel = () => {
        this.setState({
            message: "Good luck!",
            greenButtonText: sideButtons.NONE,
            highlightedAnswer: null,
            redButtonText: sideButtons.WALKAWAY,
        });
    }

    sideButtonPressed = (button) => {
        switch (button) {
            case sideButtons.CONFIRM:
                this.submitAnswer();
                break;
            case sideButtons.RETHINK:
                this.clearAnswer();
                break;
            case sideButtons.OHNO:
                this.incorrectAnswerSubmitted();
                break;
            case sideButtons.CONTINUE:
                this.continueWithRound();
                break;
            case lifelines.FIFTYFIFTY:
                this.lifelineFiftyFifty();
                break;
            case lifelines.ASKA:
            case lifelines.ASKB:
                this.lifelineAsk(button);
                break;
            case sideButtons.WALKAWAY:
                this.walkAwayPrompt();
                break;
            case sideButtons.WALKAWAYCONF:
                this.walkAwayConfirm();
                break;
            case sideButtons.WALKAWAYCANCEL:
                this.walkAwayCancel();
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="millionaire-game-container">
                <MillionaireMainPanel 
                    currentQuestion={this.questions[this.state.questionIndex]} 
                    highlightedAnswer={this.state.highlightedAnswer} 
                    message={this.state.message} 
                    callback={this.highlightQuestion}
                />
                <MillionaireSidePanel
                    currentScoreIndex={this.state.scoreIndex}
                    lifelines={this.state.lifelines}
                    greenButtonText={this.state.greenButtonText}
                    redButtonText={this.state.redButtonText}
                    callback={this.sideButtonPressed}
                />
            </div>
        );
    }
}

export default MillionaireGame;
