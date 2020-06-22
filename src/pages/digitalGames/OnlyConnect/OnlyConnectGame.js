import React from 'react';
import './OnlyConnect.css';

class OnlyConnectGame extends React.Component {
    constructor(props) {
        super(props);

        var answerGrid = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["10", "11", "12", "13"],
            ["9", "14", "15", "16"]
        ];

        this.state = {
            answerGrid: answerGrid
        }
    }

    createAnswerGrid() {
        var answerGrid = [];

        return answerGrid();
    }



    createAnswerBox(answerText) {
        var answerBox = <div id={answerText + "-box"} className="answer-box">{answerText}</div>;
        return answerBox;
    }

    render() {
        return (
            <div className="only-connect-game-container">
                <div id='grid' className='grid'>
                    {this.state.answerGrid.map((row, rowIndex) =>
                        <div key={"grid-row-" + rowIndex} className="grid-row">
                            {row.map((box, columnIndex) =>
                                <div key={"box-" + rowIndex + "-" + columnIndex} className="grid-box">
                                    {this.state.answerGrid[rowIndex][columnIndex]}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default OnlyConnectGame;
