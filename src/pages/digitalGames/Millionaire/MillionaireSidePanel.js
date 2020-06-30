import React from 'react';
import './Millionaire.css';
import { pointsList, sideButtons} from './MillionaireConstants';

function MillionaireSidePanel({currentScoreIndex, lifelines, greenButtonText, callback}) {
    return (
        <div className="millionaire-side-panel">
            <div className="millionaire-score-tracker">
                {pointsList.map((points, pointsIndex) =>
                    <div
                        key={"millionaire-points-" + pointsIndex}
                        className="millionaire-points" 
                        checkpoint={pointsIndex % 4 === 3 ? "true" : null}
                        currentscore={currentScoreIndex === pointsIndex ? "true" : null}>
                        {points}
                    </div>
                )}
            </div>
            <div className="millionaire-lifelines">
                {lifelines.map((lifeline, lifelineIndex) =>
                    <button 
                        key={"millionaire-lifelines-" + lifelineIndex}
                        className="millionaire-lifeline"
                        onClick={() => {callback(lifeline)}}>
                        {lifeline}
                    </button>
                )}
            </div>
            <div className="millionaire-buttons">
                <button 
                    className="millionaire-button-confirm" 
                    hidebutton={greenButtonText === sideButtons.NONE ? "true" : null} 
                    onClick={() => {callback(greenButtonText)}}>
                    {greenButtonText}
                </button>
                <button className="millionaire-button-walk-away" onClick={() => {callback(sideButtons.WALKAWAY)}}>Walk Away</button>
            </div>
        </div>
    );
  }


export default MillionaireSidePanel;
