import React, { useState } from 'react';
import './OnlyConnect.css';
import OnlyConnectGame from './OnlyConnectGame';

function OnlyConnectApp() {
    const [puzzle, setPuzzle] = useState(null);

    const testPuzzle = [
        ["Link", "Truss", "Annex", "Correlate"],
        ["Samus", "Ratchet", "Steve", "Forty Seven"],
        ["Fox", "Panther", "Zebra", "Snake"],
        ["Papadam", "Seventy", "Marocain", "Gabelle"],
        ["Nine", "Twenty Five", "Forty Nine", "Sixty Four"]
    ];
    
    const buttonClick = (puzzle) => {
        setPuzzle(puzzle);
    }

    var content;

    if (puzzle) {
        content = <OnlyConnectGame answers={puzzle}/>
    } else {
        content = <div className="only-connect-intro-page">
            <p className="only-connect-intro-title">Only Connect Wall Round!</p>
            <p className="only-connect-intro-text">When your whole team can see your screen and is ready, click start to begin!</p>
            <button className="only-connect-start-button" onClick={()=>{buttonClick(testPuzzle)}}>Start</button>
        </div>
    }
    return (
        <div className="only-connect-app-container">
            {content}
        </div>
    );
  }


export default OnlyConnectApp;
