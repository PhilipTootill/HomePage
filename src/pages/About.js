import React from 'react';
import './Page.css';
import profilePhoto from '../assets/profilePhoto.jpg'

function About() {
  return (
    <div className="page-content">
      <p className="page-title">About</p>
      <div className="page-section">
        <img src={profilePhoto} alt="The author"/>
        <p>
          I'm an Oxford based software developer and amateur game designer. 
          I made this site using React to showcase my game designs. 
          The code for the site is available <a href="https://github.com/PhilipTootill/HomePage">here</a>.
        </p>
        <p>
          I started designing games in 2014, after seeing Matt Leacock give a talk about game design at the UK Games Expo.
          Since then, I've worked on a range of different games, and had one game published: Labyrinth, as part of the collection <a href="https://jellybean.games/the-lady-and-the-tiger/">The Lady and the Tiger</a>.
        </p>
        <p>
          Under "Board Games", you'll find summaries of the projects I'm most proud of, and sell sheets for the games which are in a pitchable condition.
        </p>
        <p>
          I also have a handful of digital prototypes, under "Digital Games".
        </p>
      </div>
    </div>
  );
}

export default About;
