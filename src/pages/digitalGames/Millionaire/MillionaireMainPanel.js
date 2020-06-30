import React from 'react';
import './Millionaire.css';

function MillionaireMainPanel({currentQuestion, message, highlightedAnswer, callback}) {
    return (
        <div className="millionaire-main-panel">
            <div className="millionaire-question-container">
                {currentQuestion.question}
            </div>
            <div className="millionaire-answers-container">
                {currentQuestion.answers.map((answer, answerIndex) =>
                    <div
                        key={"millionaire-answer-" + answerIndex}
                        className="millionaire-answer"
                        highlighted={answer === highlightedAnswer ? "true" : null}
                        onClick={() => {callback(answer)}}>
                        {answer}
                    </div>
                )}
            </div>
            <div className="millionaire-message-box">
                {message}
            </div>
        </div>
    );
  }


export default MillionaireMainPanel;
