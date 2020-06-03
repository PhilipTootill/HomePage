import React from 'react';
import './Header.css';
import Menu from './Menu'

function Header() {
  return (
    <header>
      <div className="header-content">
        <p className="header-title">
          Game Design Portfolio
        </p>
        <p className="header-subtitle">
          By Philip Tootill
        </p>
      </div>
      <Menu/>
    </header>
  );
}

export default Header;
