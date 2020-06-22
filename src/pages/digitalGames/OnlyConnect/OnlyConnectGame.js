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
            answerGrid: answerGrid,
            highlightedAnswers: []
        }
    }

    boxClickHandler(rowIndex, columnIndex) {
        var answer = this.state.answerGrid[rowIndex][columnIndex];
        var answerIndex = this.state.highlightedAnswers.indexOf(answer);

        if (answerIndex >= 0) {
            this.state.highlightedAnswers.splice(answerIndex, 1);
        } else {
            this.state.highlightedAnswers.push(answer);
            this.state.highlightedAnswers.sort();
        }

        if (this.state.highlightedAnswers.length === 4) {
            if (this.checkAnswers()) {
                console.log("correct");
            } else {
                console.log("Wrong!");
            }

            this.state.highlightedAnswers.splice(0, 4);
        }

        this.setState({
            highlightedAnswers: this.state.highlightedAnswers
        })
    }

    checkAnswers() {
        const answers1 = ["1", "4", "9", "16"];
        const answers2 = ["2", "3", "5", "7"];
        const answers3 = ["6", "8", "10", "12"];
        const answers4 = ["11", "13", "14", "15"];

        if (this.arraysMatch(this.state.highlightedAnswers, answers1) ||
            this.arraysMatch(this.state.highlightedAnswers, answers2) ||
            this.arraysMatch(this.state.highlightedAnswers, answers3) ||
            this.arraysMatch(this.state.highlightedAnswers, answers4)) {
            return true;
        }

        return false;
    }

    arraysMatch(arr1, arr2) {
        // Check if the arrays are the same length
        if (arr1.length !== arr2.length) return false;
    
        // Check if all items exist and are in the same order
        for (var i = 0; arr1.length < i; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }

    render() {
        return (
            <div className="only-connect-game-container">
                <div id='grid' className='grid'>
                    {this.state.answerGrid.map((row, rowIndex) =>
                        <div key={"grid-row-" + rowIndex} id={"grid-row-" + rowIndex} className="grid-row">
                            {row.map((boxText, columnIndex) =>
                                <div
                                    key={"box-" + rowIndex + "-" + columnIndex} 
                                    id={"box-" + rowIndex + "-" + columnIndex} 
                                    className="grid-box"
                                    onClick={()=>{this.boxClickHandler(rowIndex, columnIndex)}}
                                    highlighted={this.state.highlightedAnswers.includes(boxText) ? "true" : null}>
                                    {boxText}
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
