import React from 'react';
import './Millionaire.css';
import { shuffleArray, arraysMatch } from '../DigitalGamesUtils';
import MillionaireMainPanel from './MillionaireMainPanel';
import MillionaireSidePanel from './MillionaireSidePanel';
import { pointsList, lifelines, sideButtons, questionState } from './MillionaireConstants';

class MillionaireGame extends React.Component {
    constructor(props) {
        super(props);

        this.questions = props.answers;

        this.state = {
            message: "Good luck! Here's question one.",
            questionIndex: 0,
            scoreIndex: -1,
            lifelines: [lifelines.FIFTYFIFTY, lifelines.ASKA, lifelines.ASKB],
            finalScoreSet: false,
            finalScoreIndex: -1,
            highlightedAnswer: null,
            greenButtonText: sideButtons.NONE,
            redButtonText: sideButtons.NONE,
            questionState: questionState.GUESSING,
            fiftyFifty: false
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
                greenButtonText: sideButtons.NONE,
                redButtonText: sideButtons.NONE
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
        if (this.state.finalScoreSet) {
            this.setState({
                message: "Take your time.",
                highlightedAnswer: null,
                greenButtonText: sideButtons.NONE,
                redButtonText: sideButtons.NONE
            })
        } else {
            this.setState({
                message: "Take your time. You can still walk away.",
                highlightedAnswer: null,
                greenButtonText: sideButtons.NONE,
                redButtonText: sideButtons.WALKAWAY
            })
        }

    }

    submitAnswer = () => {
        var correctAnswer = this.questions[this.state.questionIndex].correctAnswer;

        if (this.state.highlightedAnswer === correctAnswer) {
            var finalScoreIndex = this.state.finalScoreIndex;
            var scoreIndex = this.state.scoreIndex;

            if (!this.state.finalScoreSet && this.state.questionIndex % 4 === 3) {
                finalScoreIndex = this.state.questionIndex;
            }

            var message =  "Correct! Get ready for the next question.";

            if (this.state.questionIndex === this.questions.length - 1) {
                scoreIndex++;
                message = "Congratulations! You got all the questions right!"
            }

            this.setState({
                message: message,
                finalScoreIndex: finalScoreIndex,
                greenButtonText: sideButtons.CONTINUE,
                redButtonText: sideButtons.NONE,
                scoreIndex: scoreIndex,
                questionState: questionState.CORRECT
            })
        } else {
            var nextButton = sideButtons.CONTINUE;

            if (!this.state.finalScoreSet) {
                nextButton = sideButtons.OHNO;
            }

            this.setState({
                message: "I'm sorry, that's not the answer! The correct answer was " + correctAnswer + ".",
                finalScoreSet: true,
                greenButtonText: nextButton,
                redButtonText: sideButtons.NONE,
                questionState: questionState.INCORRECT
            })
        }
    }

    incorrectAnswerSubmitted = () => {
        this.setState({
            scoreIndex: this.state.finalScoreIndex
        });

        this.displayFinalScoreAndContinue();
    }

    printScore = (index) => {
        var string = "0 points";

        if (index >= 0) {
            string = pointsList[index];
        }

        return string;
    }

    displayFinalScoreAndContinue = () => { 
        this.setState({
            message: "You got " + this.printScore(this.state.finalScoreIndex) + " for the round. You can do the rest of the questions while you wait.",
            greenButtonText: sideButtons.CONTINUE
        })
    }

    continueWithRound = () => {
        var questionIndex = this.state.questionIndex + 1;

        if (questionIndex === this.questions.length) {
            this.setState({
                message: "That's the end of the quiz! You got " + this.printScore(this.state.finalScoreIndex) + ". Thanks for playing.",
                greenButtonText: sideButtons.NONE,
                redButtonText: sideButtons.NONE
            });
        } else {
            var scoreIndex = this.state.scoreIndex;
            var redButtonText = sideButtons.NONE;

            if (!this.state.finalScoreSet) {
                scoreIndex++;
                redButtonText = sideButtons.WALKAWAY;
            }
    
            this.setState({
                questionIndex: questionIndex,
                scoreIndex: scoreIndex,
                message: null,
                greenButtonText: sideButtons.NONE,
                redButtonText: redButtonText,
                highlightedAnswer: null,
                questionState: questionState.GUESSING,
                fiftyFifty: false
            });
        }
    }

    lifelineFiftyFifty = () => {
        if (this.state.greenButtonText !== sideButtons.NONE && 
            this.state.greenButtonText !== sideButtons.CONFIRM) {
            return;
        }

        this.setState({
            message: "Okay, I've removed two incorrect answers!",
            fiftyFifty: true
        });
        
        this.consumeLifeline(lifelines.FIFTYFIFTY);
    }

    lifelineAsk = (button) => {
        if (this.state.greenButtonText !== sideButtons.NONE && 
            this.state.greenButtonText !== sideButtons.CONFIRM) {
            return;
        }
        
        console.log(button);
        var message;
        var currentQuestion = this.questions[this.state.questionIndex]
        if (button === lifelines.ASKA) {
            message = "Dave says: " + currentQuestion.askA;
        } else {
            message = "Radhika says: " + currentQuestion.askB;
        }

        this.setState({message: message});
        //this.consumeLifeline(button);
    }

    consumeLifeline = (lifeline) => {
        var index = this.state.lifelines.indexOf(lifeline);
        this.state.lifelines[index] = "";
    }

    walkAwayPrompt = () => {
        this.setState({
            message: "Are you sure you want to walk away with " + this.printScore(this.state.scoreIndex) + "?",
            greenButtonText: sideButtons.WALKAWAYCONF,
            redButtonText: sideButtons.WALKAWAYCANCEL
        });
    }
    
    walkAwayConfirm = () => {
        this.setState({
            finalScoreSet: true,
            finalScoreIndex: this.state.scoreIndex,
            message: "You get " + this.printScore(this.state.scoreIndex) + " for the round! You can keep going while you wait.",
            greenButtonText: sideButtons.NONE,
            redButtonText: sideButtons.NONE
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
                    questionState={this.state.questionState}
                    fiftyFifty={this.state.fiftyFifty}
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
