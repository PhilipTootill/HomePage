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
            message: "This is the message box!",
            questionIndex: 0,
            lifelines: [lifelines.FIFTYFIFTY, lifelines.ASKA, lifelines.ASKB],
            gameOver: false,
            finalScore: null,
            highlightedAnswer: null,
            greenButtonText: sideButtons.NONE
        }
    }

    highlightQuestion = (answer) => {
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
                greenButtonText: sideButtons.CONFIRM
            })
        }
    };

    submitAnswer = () => {
        console.log('TODO: Submit');
    }

    lifelineFiftyFifty = () => {
        console.log('TODO: fifty fifty');
    }

    lifelineAsk = (button) => {
        console.log('TODO: Ask ' + button);
    }

    walkAway = () => {
        console.log('TODO: Walkaway');

        var finalScore = pointsList[this.state.questionIndex - 1]

        this.setState({
            gameOver: true,
            finalScore: finalScore,
            message: "You get " + finalScore + " points for the round!"
        });
    }

    sideButtonPressed = (button) => {
        switch (button) {
            case sideButtons.CONFIRM:
                this.submitAnswer();
                break;
            case lifelines.FIFTYFIFTY:
                this.lifelineFiftyFifty();
                break;
            case lifelines.ASKA:
            case lifelines.ASKB:
                this.lifelineAsk(button);
                break;
            case sideButtons.WALKAWAY:
                this.walkAway();
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
                    currentScoreIndex={this.state.questionIndex - 1}
                    lifelines={this.state.lifelines}
                    greenButtonText={this.state.greenButtonText}
                    callback={this.sideButtonPressed}
                />
            </div>
        );
    }
}

export default MillionaireGame;
