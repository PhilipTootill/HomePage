import React from 'react';
import './Menu.css';

class Menu extends React.Component {
  render() {
    return(
      <div className="menu">
        <button className="menu-button">Menu</button>
        <ul className="menu-list">
          <li className="menu-list-item">About Me</li>
          <li className="menu-list-item">Board Games</li>
          <li className="menu-list-item">Digital Games</li>
          <li className="menu-list-item">Contact</li>
        </ul>
      </div>
    );
  }
}

export default Header;
