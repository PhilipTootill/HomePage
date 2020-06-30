import React from 'react';
import './Millionaire.css';
import { shuffleArray, arraysMatch } from '../DigitalGamesUtils';

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
]
    
const question = "Which of these objects is the biggest?";

const answerList = [
    "An Elephant",
    "The Moon",
    "A Peanut",
    "A Kettle"
];

const message = "This is the message box!";

class MillionaireGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="millionaire-game-container">
                <div className="millionaire-main-panel">
                    <div className="millionaire-question-container">
                        {question}
                    </div>
                    <div className="millionaire-answers-container">
                        {answerList.map((answer, answerIndex) =>
                            <div className="millionaire-answer">
                                {answerList[answerIndex]}
                            </div>
                        )}
                    </div>
                    <div className="millionaire-message-box">
                        {message}
                    </div>
                </div>
                <div className="millionaire-side-panel">
                    <div className="millionaire-score-tracker">
                        {pointsList.map((points, pointsIndex) =>
                            <div className="millionaire-points" checkpoint={pointsIndex % 4 === 3 ? "true" : null}>{points}</div>
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
