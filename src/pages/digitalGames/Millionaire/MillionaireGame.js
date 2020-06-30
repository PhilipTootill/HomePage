import React from 'react';
import './Millionaire.css';
import { shuffleArray, arraysMatch } from '../DigitalGamesUtils';
import MillionaireMainPanel from './MillionaireMainPanel';
import MillionaireSidePanel from './MillionaireSidePanel';
import { pointsList } from './MillionaireConstants';

class MillionaireGame extends React.Component {
    constructor(props) {
        super(props);

        this.questions = props.answers;

        this.state = {
            message: "This is the message box!",
            questionIndex: 0,
            lifelines: ["50/50", "Ask A", "Ask B"],
            walkedAway: false,
            highlightedAnswer: null
        }
    }

    highlightQuestion = (answer) => {
        this.setState({
            highlightedAnswer: answer,
            message: "Are you sure?"
        })
    };

    sideButtonPressed = (button) => {
        console.log("You clicked " + button)
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
                    callback={this.sideButtonPressed}
                />
            </div>
        );
    }
}

export default MillionaireGame;
