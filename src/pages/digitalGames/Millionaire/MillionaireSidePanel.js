import React from 'react';
import './Millionaire.css';
import { pointsList, sideButtons} from './MillionaireConstants';

function MillionaireSidePanel({currentScoreIndex, lifelines, greenButtonText, redButtonText, callback}) {
    return (
        <div className="millionaire-side-panel">
            <div className="millionaire-lifelines">
                {lifelines.map((lifeline, lifelineIndex) =>
                    <button 
                        key={"millionaire-lifelines-" + lifelineIndex}
                        className="millionaire-lifeline"
                        hidelifeline={lifeline === "" ? "true" : null}
                        onClick={() => {callback(lifeline)}}>
                        {lifeline}
                    </button>
                )}
            </div>
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
            <div className="millionaire-buttons">
                <button 
                    className="millionaire-button-green" 
                    hidebutton={greenButtonText === sideButtons.NONE ? "true" : null} 
                    onClick={() => {callback(greenButtonText)}}>
                    {greenButtonText}
                </button>
                <button 
                    className="millionaire-button-red" 
                    hidebutton={redButtonText === sideButtons.NONE ? "true" : null} 
                    onClick={() => {callback(redButtonText)}}>
                    {redButtonText}
                </button>
            </div>
        </div>
    );
  }


export default MillionaireSidePanel;
