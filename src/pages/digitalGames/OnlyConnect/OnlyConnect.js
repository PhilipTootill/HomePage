import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import OnlyConnectGame from './OnlyConnectGame';
import OnlyConnectMarkdown from './OnlyConnect.md';

function OnlyConnect() {
  const [markdown, setMarkdown] = useState("");
  fetch(OnlyConnectMarkdown).then(res => res.text()).then(text => setMarkdown(text));

  return (
    <div>
      <p className="page-title">Pocket Hexes</p>
      <div>
        <OnlyConnectGame/>
      </div>
      <div className="page-section">
        <ReactMarkdown source={markdown} />
      </div>
    </div>
  );
}

export default OnlyConnect;
