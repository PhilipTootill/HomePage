import React, {useState} from 'react';
import './Menu.css';
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter as Router, Link} from 'react-router-dom';

function Menu() {
  const [open, setOpen] = useState(false);

  return(
    <div className="menu">
      <button onClick={function() {setOpen(!open)}} className="menu-button">
        <MenuIcon/>
      </button>
      <Router>
        <ul className="menu-list" open={open}>
          <li className="menu-list-item">
            <Link to="/">About Me</Link>
          </li>
          <li className="menu-list-item">
            <Link to="/board-games">Board Games</Link>
          </li>
          <li className="menu-list-item">
            <Link to="/digital-games">Digital Games</Link>
          </li>
          <li className="menu-list-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </Router>
    </div>
  );
}

export default Menu;
