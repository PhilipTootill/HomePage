import React from 'react';
import './Millionaire.css';
import MillionaireQuestionPanel from './MillionaireQuestionPanel';
import MillionaireMessagePanel from './MillionaireMessagePanel';
import MillionaireSidePanel from './MillionaireSidePanel';
import { pointsList, sideButtons, eventButtons, questionState } from './MillionaireConstants';

class MillionaireGame extends React.Component {
    constructor(props) {
        super(props);

        this.questions = props.answers;

        this.state = {
            message: "Good luck! Here's question one.",
            questionIndex: 0,
            scoreIndex: -1,
            lifelines: [sideButtons.FIFTYFIFTY, sideButtons.ASKA, sideButtons.ASKB],
            finalScoreSet: false,
            finalScoreIndex: -1,
            highlightedAnswer: null,
            greenButtonText: eventButtons.NONE,
            redButtonText: eventButtons.NONE,
            questionState: questionState.GUESSING,
            fiftyFifty: false,
            showWalkaway: false
        }
    }

    highlightQuestion = (answer) => {
        if (this.state.greenButtonText !== eventButtons.NONE && 
            this.state.greenButtonText !== eventButtons.CONFIRM) {
            return;
        }

        if (answer === this.state.highlightedAnswer) {
            this.setState({
                highlightedAnswer: null,
                message: null,
                greenButtonText: eventButtons.NONE,
                redButtonText: eventButtons.NONE
            })
        } else {
            this.setState({
                highlightedAnswer: answer,
                message: "Are you sure?",
                greenButtonText: eventButtons.CONFIRM,
                redButtonText: eventButtons.RETHINK
            })
        }
    };

    clearAnswer = () => {
        if (this.state.finalScoreSet) {
            this.setState({
                message: "Take your time.",
                highlightedAnswer: null,
                greenButtonText: eventButtons.NONE,
                redButtonText: eventButtons.NONE
            })
        } else {
            this.setState({
                message: "Take your time. You can still walk away.",
                highlightedAnswer: null,
                greenButtonText: eventButtons.NONE,
                redButtonText: eventButtons.NONE
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
            var allQuestionsDone = (this.state.questionIndex === this.questions.length - 1);
            if (allQuestionsDone && !this.state.finalScoreSet) {
                scoreIndex++;
                message = "Congratulations! You got all the questions right!";
            } else if (allQuestionsDone) {
                message = "That's the last question.";
            }

            this.setState({
                message: message,
                finalScoreIndex: finalScoreIndex,
                greenButtonText: eventButtons.CONTINUE,
                redButtonText: eventButtons.NONE,
                scoreIndex: scoreIndex,
                questionState: questionState.CORRECT,
                showWalkaway: (!allQuestionsDone && !this.state.finalScoreSet)
            })
        } else {
            var nextButton = eventButtons.CONTINUE;

            if (!this.state.finalScoreSet) {
                nextButton = eventButtons.OHNO;
            }

            this.setState({
                message: "I'm sorry, that's not the answer! The correct answer was " + correctAnswer + ".",
                finalScoreSet: true,
                greenButtonText: nextButton,
                redButtonText: eventButtons.NONE,
                questionState: questionState.INCORRECT,
                showWalkaway: false
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
            greenButtonText: eventButtons.CONTINUE
        })
    }

    continueWithRound = () => {
        var questionIndex = this.state.questionIndex + 1;

        if (questionIndex === this.questions.length) {
            this.setState({
                message: "That's the end of the quiz! You got " + this.printScore(this.state.finalScoreIndex) + ". Thanks for playing.",
                greenButtonText: eventButtons.NONE,
                redButtonText: eventButtons.NONE
            });
        } else {
            var scoreIndex = this.state.scoreIndex;

            if (!this.state.finalScoreSet) {
                scoreIndex++;
            }
    
            this.setState({
                questionIndex: questionIndex,
                scoreIndex: scoreIndex,
                message: null,
                greenButtonText: eventButtons.NONE,
                redButtonText: eventButtons.NONE,
                highlightedAnswer: null,
                questionState: questionState.GUESSING,
                fiftyFifty: false
            });
        }
    }

    lifelineFiftyFifty = () => {
        if (this.state.greenButtonText !== eventButtons.NONE && 
            this.state.greenButtonText !== eventButtons.CONFIRM) {
            return;
        }

        this.setState({
            message: "Okay, I've removed two incorrect answers!",
            fiftyFifty: true
        });
        
        this.consumeLifeline(sideButtons.FIFTYFIFTY);
    }

    lifelineAsk = (button) => {
        if (this.state.greenButtonText !== eventButtons.NONE && 
            this.state.greenButtonText !== eventButtons.CONFIRM) {
            return;
        }

        console.log(button);
        var message;
        var currentQuestion = this.questions[this.state.questionIndex]
        if (button === sideButtons.ASKA) {
            message = "Dave says: " + currentQuestion.askA;
        } else {
            message = "Radhika says: " + currentQuestion.askB;
        }

        this.setState({message: message});
        this.consumeLifeline(button);
    }

    consumeLifeline = (lifeline) => {
        var index = this.state.lifelines.indexOf(lifeline);
        this.state.lifelines[index] = "";
    }

    walkAwayPrompt = () => {
        this.setState({
            message: "Are you sure you want to walk away with " + this.printScore(this.state.scoreIndex) + "?",
            greenButtonText: eventButtons.WALKAWAYCONF,
            redButtonText: eventButtons.WALKAWAYCANCEL
        });
    }
    
    walkAwayConfirm = () => {
        this.setState({
            finalScoreSet: true,
            finalScoreIndex: this.state.scoreIndex,
            message: "You get " + this.printScore(this.state.scoreIndex) + " for the round! You can keep going while you wait.",
            greenButtonText: eventButtons.NONE,
            redButtonText: eventButtons.NONE,
            showWalkaway: false
        });
    }

    walkAwayCancel = () => {
        this.setState({
            message: "Good luck!",
            greenButtonText: eventButtons.NONE,
            highlightedAnswer: null,
            redButtonText: eventButtons.NONE
        });
    }

    handleEventButton = (button) => {
        switch (button) {
            case eventButtons.CONFIRM:
                this.submitAnswer();
                break;
            case eventButtons.RETHINK:
                this.clearAnswer();
                break;
            case eventButtons.OHNO:
                this.incorrectAnswerSubmitted();
                break;
            case eventButtons.CONTINUE:
                this.continueWithRound();
                break;
            case eventButtons.WALKAWAYCONF:
                this.walkAwayConfirm();
                break;
            case eventButtons.WALKAWAYCANCEL:
                this.walkAwayCancel();
                break;
            default:
                break;
        }
    }

    handleSideButton = (button) => {
        switch (button) {
            case sideButtons.FIFTYFIFTY:
                this.lifelineFiftyFifty();
                break;
            case sideButtons.ASKA:
            case sideButtons.ASKB:
                this.lifelineAsk(button);
                break;
            case sideButtons.WALK:
                this.walkAwayPrompt();
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="millionaire-game-container">
                <div className="millionaire-main-panel">
                    <MillionaireQuestionPanel 
                        currentQuestion={this.questions[this.state.questionIndex]} 
                        highlightedAnswer={this.state.highlightedAnswer}
                        questionState={this.state.questionState}
                        fiftyFifty={this.state.fiftyFifty}
                        callback={this.highlightQuestion}
                    />
                    <MillionaireMessagePanel 
                        currentQuestion={this.questions[this.state.questionIndex]} 
                        highlightedAnswer={this.state.highlightedAnswer}
                        questionState={this.state.questionState}
                        fiftyFifty={this.state.fiftyFifty}
                        message={this.state.message}
                        greenButtonText={this.state.greenButtonText}
                        redButtonText={this.state.redButtonText}
                        callback={this.handleEventButton}
                    />
                </div>
                <MillionaireSidePanel
                    currentScoreIndex={this.state.scoreIndex}
                    lifelines={this.state.lifelines}
                    showWalkAway={this.state.showWalkaway}
                    callback={this.handleSideButton}
                />
            </div>
        );
    }
}

export default MillionaireGame;
