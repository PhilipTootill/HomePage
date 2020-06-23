import React from 'react';
import profilePhoto from '../assets/profilePhoto.jpg';

function Contact() {
  return (
    <div className="page-content">
      <p className="page-title">Contact</p>
      <div className="page-section">
        <img className="page-inlay-image" src={profilePhoto} alt="The author"/>
        <p>If you have questions about any of my games, feel free to get in touch with me.</p>
        <p>Twitter: @WSGameDesign</p>
      </div>
    </div>
  );
}

export default Contact;
