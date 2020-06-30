import React from 'react';
import './Millionaire.css';

function MillionaireMainPanel({currentQuestion, message, highlightedAnswer, fiftyFifty, questionState, callback}) {
    function doesFiftyFiftyHide(answer) {
        if (!fiftyFifty) {
            return false;
        } else if (answer === currentQuestion.correctAnswer || answer === currentQuestion.fiftyFiftyAnswer) {
            return false;
        }

        return true;
    }
    
    return (
        <div className="millionaire-main-panel">
            <div className="millionaire-question-container">
                {currentQuestion.question}
            </div>
            <div className="millionaire-answers-container" questionstate={questionState}>
                {currentQuestion.answers.map((answer, answerIndex) =>
                    <div
                        key={"millionaire-answer-" + answerIndex}
                        className="millionaire-answer"
                        hideanswer={doesFiftyFiftyHide(answer) ? "true" : null}
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
