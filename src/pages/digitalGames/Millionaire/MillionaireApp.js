import React, { useState } from 'react';
import './Millionaire.css';
import MillionaireGame from './MillionaireGame';

function MillionaireApp() {
    const [puzzle, setPuzzle] = useState(null);

    const puzzle1 = [
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
        content = <MillionaireGame answers={puzzle}/>
    } else {
        content = <div className="millionaire-intro-page">
            <p className="millionaire-intro-title">Who Wants To Win 20 Points?</p>
            <p className="millionaire-intro-text">When your whole team can see your screen and is ready, click start to begin!</p>
            <div className="millionaire-intro-buttons">
                <button className="millionaire-start-button" onClick={()=>{buttonClick(puzzle1)}}>Start</button>
            </div> 
        </div>
    }
    return (
        <div className="millionaire-app-container">
            {content}
        </div>
    );
  }


export default MillionaireApp;
