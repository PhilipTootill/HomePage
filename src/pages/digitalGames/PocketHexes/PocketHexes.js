import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import PocketHexesGame from './PocketHexesGame';
import PocketHexesMarkdown from './PocketHexes.md';

function PocketHexes() {
  const [markdown, setMarkdown] = useState("");
  fetch(PocketHexesMarkdown).then(res => res.text()).then(text => setMarkdown(text));


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
