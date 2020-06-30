import React from 'react';
import './Millionaire.css';

const questionLetters = [
    "A",
    "B",
    "C",
    "D"
]

function MillionaireQuestionPanel({currentQuestion,highlightedAnswer, fiftyFifty, questionState, callback}) {
    function doesFiftyFiftyHide(answer) {
        if (!fiftyFifty) {
            return false;
        } else if (answer === currentQuestion.correctAnswer || answer === currentQuestion.fiftyFiftyAnswer) {
            return false;
        }

        return true;
    }
    
    return (
        <div className="millionaire-question-panel">
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
                        <div className="millionaire-answer-letter">
                            {questionLetters[answerIndex]}:
                        </div>
                        <div className="millionaire-answer-text">
                            {answer}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
  }


export default MillionaireQuestionPanel;
