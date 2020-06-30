import React from 'react';
import './Millionaire.css';
import { shuffleArray, arraysMatch } from '../DigitalGamesUtils';
import MillionaireMainPanel from './MillionaireMainPanel';

const pointsList = [
    "1 point",
    "2 points",
    "3 points",
    "4 points",
    "5 points",
    "6 points",
    "7 points",
    "8 points",
    "10 points",
    "13 points",
    "16 points",
    "20 points"
];

class MillionaireGame extends React.Component {
    constructor(props) {
        super(props);

        this.questions = props.answers;

        this.state = {
            message: "This is the message box!",
            questionIndex: 0,
            fiftyFiftyAvailable: true,
            firstPhoneAvailable: true,
            secondPhoneAvailable: true,
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

    render() {
        return (
            <div className="millionaire-game-container">
                <MillionaireMainPanel 
                    currentQuestion={this.questions[this.state.questionIndex]} 
                    highlightedAnswer={this.state.highlightedAnswer} 
                    message={this.state.message} 
                    callback={this.highlightQuestion}
                />
                <div className="millionaire-side-panel">
                    <div className="millionaire-score-tracker">
                        {pointsList.map((points, pointsIndex) =>
                            <div
                                key={"millionaire-points-" + pointsIndex}
                                className="millionaire-points" 
                                checkpoint={pointsIndex % 4 === 3 ? "true" : null}
                                currentscore={this.state.questionIndex - 1 === pointsIndex ? "true" : null}>
                                {points}
                            </div>
                        )}
                    </div>
                    <div className="millionaire-lifelines">
                        <button className="millionaire-lifeline">50/50</button>
                        <button className="millionaire-lifeline">Phone a Friend</button>
                        <button className="millionaire-lifeline">Phone a Friend</button>
                    </div>
                    <div className="millionaire-buttons">
                        <button className="millionaire-button-confirm">Confirm</button>
                        <button className="millionaire-button-walk-away">Walk Away</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MillionaireGame;
