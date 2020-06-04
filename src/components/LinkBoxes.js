import React from 'react';
import './Header.css';
import Background from "../assets/Background.jpeg"
import { Link, withRouter } from 'react-router-dom';

function LinkBoxes(props) {
  return (
    <div className="link-boxes">
      {
        props.links.map((link) =>
          <div className="link-box" style={{backgroundImage: `url(${link.image})`}}>
            <Link to={link.url}>
              <div className="link-box-overlay">{link.name}</div>
            </Link>
          </div>
        )
      }
    </div>
  );
}

export default LinkBoxes;
