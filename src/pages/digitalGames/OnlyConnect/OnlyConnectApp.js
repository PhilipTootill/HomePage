import React, { useState } from 'react';
import './OnlyConnect.css';
import OnlyConnectGame from './OnlyConnectGame';

function OnlyConnectApp() {
    const [puzzle, setPuzzle] = useState(null);

    const puzzle1 = [
        ["Link", "Truss", "Annex", "Correlate"],
        ["Samus", "Ratchet", "Steve", "Forty Seven"],
        ["Fox", "Panther", "Zebra", "Snake"],
        ["Papadam", "Seventy", "Marocain", "Gabelle"],
        ["Nine", "Twenty Five", "Forty Nine", "Sixty Four"]
    ];
    
    const donnasPuzzle = [
        ["Langham", "Szmanda", "Eads", "Hall"],
        ["Sadness", "Riley", "Joy", "Disgust"],
        ["Fox", "Moogle", "Stowe", "Cooper"],
        ["San Francisco", "Vienna", "Alexandria", "Edinburgh"],
        ["Xander", "Giles", "Willow", "Kennedy"]
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
            <div className="only-connect-intro-buttons">
                <button className="only-connect-start-button" onClick={()=>{buttonClick(puzzle1)}}>Puzzle 1</button>
                <button className="only-connect-start-button" onClick={()=>{buttonClick(donnasPuzzle)}}>Donna</button>
            
            </div>
            
        </div>
    }
    return (
        <div className="only-connect-app-container">
            {content}
        </div>
    );
  }


export default OnlyConnectApp;
