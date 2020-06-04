import React from 'react';
import HeraklesImage from '../../assets/Herakles.jpg';
import PyxisImage from '../../assets/Pyxis.jpg';
import LinkBoxes from '../../components/LinkBoxes';

const games = [
  {
    "name": "Pyxis",
    "image": PyxisImage,
    "url": "/board-games/pyxis"
  },
  {
    "name": "Herakles",
    "image": HeraklesImage,
    "url": "/board-games/herakles"
  }
]

function BoardGamesIndex() {
  return (
    <div className="page-content">
      <p className="page-title">Board Games</p>
      <LinkBoxes links={games}/>
    </div>
  );
}

export default BoardGamesIndex;
