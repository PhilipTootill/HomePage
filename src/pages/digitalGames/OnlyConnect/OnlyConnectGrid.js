import React from 'react';
import './OnlyConnect.css';

function OnlyConnectGrid({correctAnswers, remainingAnswers, highlightedAnswers, boxClickHandler}) {
    var allAnswers = correctAnswers.concat(remainingAnswers);

    var answerGrid = [
        allAnswers.slice(0, 4),
        allAnswers.slice(4, 8),
        allAnswers.slice(8, 12),
        allAnswers.slice(12, 16),
        allAnswers.slice(16),
    ];

    var rowsCorrect = correctAnswers.length / 4;

    return (
        <div id='grid' className='only-connect-grid' rowscorrect={rowsCorrect}>
            {answerGrid.map((row, rowIndex) =>
                <div
                    key={"grid-row-" + rowIndex} 
                    id={"grid-row-" + rowIndex} 
                    className="only-connect-grid-row"
                    solved={rowIndex < rowsCorrect ? "true": null}>
                    {row.map((boxText, columnIndex) =>
                        <div
                            key={"box-" + rowIndex + "-" + columnIndex} 
                            id={"box-" + rowIndex + "-" + columnIndex} 
                            className="only-connect-grid-box"
                            onClick={()=>{boxClickHandler(boxText)}}
                            highlighted={highlightedAnswers.includes(boxText) ? "true" : null}>
                            {boxText}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default OnlyConnectGrid;