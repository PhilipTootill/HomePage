import React from 'react';
import PyxisImage from '../../assets/Pyxis.jpg';
import LinkBoxes from '../../components/LinkBoxes';

const games = [
  {
    "name": "Numbers",
    "image": PyxisImage,
    "url": "/digital-games/numbers"
  },
  {
    "name": "Pocket Hexes",
    "image": PyxisImage,
    "url": "/digital-games/pocket-hexes"
  }
]

function DigitalGamesIndex() {
  return (
    <div className="page-content">
      <p className="page-title">Digital Games</p>
      <LinkBoxes links={games}/>
    </div>
  );
}

export default DigitalGamesIndex;
