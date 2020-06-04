import React from 'react';
import HeraklesImage from '../../assets/Herakles.jpg';
import PyxisImage from '../../assets/Pyxis.jpg';
import TheVinylAgeImage from '../../assets/TheVinylAge.jpg';
import InternsOfHadesImage from '../../assets/InternsOfHades.jpeg';
import RulesIncImage from '../../assets/RulesInc.jpg';
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
  },
  {
    "name": "The Vinyl Age",
    "image": TheVinylAgeImage,
    "url": "/board-games/the-vinyl-age"
  },
  {
    "name": "Rules Inc.",
    "image": RulesIncImage,
    "url": "/board-games/rules-inc"
  },
  {
    "name": "Interns Of Hades",
    "image": InternsOfHadesImage,
    "url": "/board-games/interns-of-hades"
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
