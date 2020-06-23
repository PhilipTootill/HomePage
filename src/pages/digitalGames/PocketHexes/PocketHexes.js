import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import PocketHexesGame from './PocketHexesGame';
import PocketHexesMarkdown from './PocketHexes.md';
import scoring from '../../../assets/PocketHexesScoring.png';
import example1 from '../../../assets/PocketHexesExample1.png';
import example2 from '../../../assets/PocketHexesExample2.png';
import example3 from '../../../assets/PocketHexesExample3.png';
import scoringExample1 from '../../../assets/PocketHexesScoringExample1.png';
import scoringExample2 from '../../../assets/PocketHexesScoringExample2.png';
import printAndPlay from '../../../assets/PocketHexes.pdf';

function PocketHexes() {
  const [markdown, setMarkdown] = useState("");
  fetch(PocketHexesMarkdown).then(res => res.text()).then(text => processAndSetMarkdown(text));

  function processAndSetMarkdown(text) {
    text = text.replace("__SCORING__", scoring);
    text = text.replace("__SCORING_EXAMPLE_1__", scoringExample1);
    text = text.replace("__SCORING_EXAMPLE_2__", scoringExample2);
    text = text.replace("__EXAMPLE_1__", example1);
    text = text.replace("__EXAMPLE_2__", example2);
    text = text.replace("__EXAMPLE_3__", example3);
    text = text.replace("__PRINT_AND_PLAY__", printAndPlay);
    setMarkdown(text);
  }

  return (
    <div>
      <p className="page-title">Pocket Hexes</p>
      <div>
        <PocketHexesGame/>
      </div>
      <div className="page-section">
        <ReactMarkdown source={markdown} />
      </div>
    </div>
  );
}

export default PocketHexes;
