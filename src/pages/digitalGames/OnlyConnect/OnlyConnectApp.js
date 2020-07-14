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

    const puzzle2 = [
        ["Bonehead", "The Edge", "Slash", "Joe Strummer"],
        ["Trustworthy", "Misevent", "Freighter", "Zaniness"],
        ["Pan", "The Italian", "Cheeseburger", "Crown"],
        ["Stelmaria", "Hester", "Asta", "Kirjava"],
        ["Meg", "Jo", "Beth", "Amy"]
    ];

    const puzzle3 = [
        ["Vandella", "Supreme", "Temptation", "Wonder"],
        ["Kiev", "Hunter's", "Coronation", "Chasseur"],
        ["Bride for a brother", "Deadly Sin", "Continent", "Day of the Week"],
        ["Dwarf", "Elf", "Orc", "Hobbit"],
        ["Acht", "Vier", "Drei", "Zehn"]
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
            <p className="only-connect-intro-text">When your whole team can see your screen and is ready, choose a puzzle to begin!</p>
            <div className="only-connect-intro-buttons">
                <button className="only-connect-start-button" onClick={()=>{buttonClick(puzzle1)}}>Puzzle 1</button>
                <button className="only-connect-start-button" onClick={()=>{buttonClick(puzzle2)}}>Puzzle 2</button>
                <button className="only-connect-start-button" onClick={()=>{buttonClick(puzzle3)}}>Puzzle 3</button>     
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
