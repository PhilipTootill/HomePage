import React from 'react';
import './Millionaire.css';
import {eventButtons} from './MillionaireConstants';

function MillionaireMessagePanel({message, greenButtonText, redButtonText, callback}) {
    return (
        <div className="millionaire-message-panel">
            <div className="millionaire-message-box">
                {message}
            </div>
            <div className="millionaire-buttons">
                <button 
                    className="millionaire-button-green" 
                    hidebutton={greenButtonText === eventButtons.NONE ? "true" : null} 
                    onClick={() => {callback(greenButtonText)}}>
                    {greenButtonText}
                </button>
                <button 
                    className="millionaire-button-red" 
                    hidebutton={redButtonText === eventButtons.NONE ? "true" : null} 
                    onClick={() => {callback(redButtonText)}}>
                    {redButtonText}
                </button>
            </div>
        </div>
    );
  }


export default MillionaireMessagePanel;
