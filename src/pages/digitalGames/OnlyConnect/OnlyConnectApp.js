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
        ["Bonehead", "Dylan", "Slash", "Strummer"],
        ["Trustworthy", "Misevent", "Freighter", "Zaniness"],
        ["Pan", "The Italian", "Cheeseburger", "The Edge"],
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

    const jane1 = [
        ["London", "Private", "Naked", "Cat's"],
        ["Montreal", "Munich", "Atlanta", "Sidney"],
        ["Ordinary World", "Rio", "Save A Prayer", "The Reflex"],
        ["Planet Earth", "Frozen Planet", "Zoo Quest", "Africa"]
    ];

    const jane2 = [
        ["Drury", "Hanger", "Chancery", "Penny"],
        ["Camel", "Strand", "Pallmall", "Mayfair"],
        ["Whitehall", "London", "Daniel", "Black"],
        ["Long Distance", "Road", "Blade", "Bow Street"]
    ];

    const jane3 = [
        ["Spanner", "Dagger", "Candlestick", "Revolver"],
        ["Psycho", "Vertigo", "Rear Window", "Rope"],
        ["Cannon", "Ironside", "Rockford", "Shaft"],
        ["Kremlin", "Grand Slam", "Hopman", "Davis"]
    ];

    const jane4 = [
        ["Horse", "Peg", "Line", "Brush"],
        ["English Breakfast", "House", "Strength", "Stop"],
        ["Wee", "Eye", "Hymn", "Ewe"],
        ["Hind", "Jenny", "Hen", "Sow"]
    ];

    const jane5 = [
        ["Malaprop", "Grundy", "Doubtfire", "Robinson"],
        ["Washboard", "Mangle", "Airer", "Dolly"],
        ["Rose", "Casey", "Wood", "Donald"],
        ["Iris", "Pupil", "Cornea", "Sclera"]
    ];

    const jane6 = [
        ["Martin", "Lawford", "Bishop", "Sinatra"],
        ["Lampard", "Oz", "Spencer", "Zappa"],
        ["Ames", "Liver", "Avid", "Uke"],
        ["Deacon", "Priest", "Pope", "Canon"]
    ];

    const jane7 = [
        ["Marbles", "Temper", "Bearings", "Grip"],
        ["Heathrow", "Majority", "Browning", "Mayor"],
        ["Krypton", "Gallifrey", "Vulcan", "Tatooine"],
        ["Wellington", "Harris", "Halifax", "Lancaster"]
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
                <button className="only-connect-start-button" onClick={()=>{buttonClick(puzzle2)}}>Start Puzzle</button>   
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
