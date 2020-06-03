import React from 'react';
import './Header.css';
import Background from "../assets/Background.jpeg"

const backgroundStyle = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'left'
}

function Header() {
  return (
    <header>
      <div style={backgroundStyle} className="header-content">
        <p className="header-title">
          Game Design Portfolio
        </p>
        <p className="header-subtitle">
          By Philip Tootill
        </p>
      </div>
    </header>
  );
}

export default Header;
