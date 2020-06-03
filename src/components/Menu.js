import React, {useState} from 'react';
import './Menu.css';
import MenuIcon from '@material-ui/icons/Menu';

function Menu() {
  const [open, setOpen] = useState(false);

  return(
    <div className="menu">
      <button onClick={function() {setOpen(!open)}} className="menu-button">
        <MenuIcon/>
      </button>
      <ul className="menu-list" open={open}>
        <li className="menu-list-item">About Me</li>
        <li className="menu-list-item">Board Games</li>
        <li className="menu-list-item">Digital Games</li>
        <li className="menu-list-item">Contact</li>
      </ul>
    </div>
  );
}

export default Menu;
