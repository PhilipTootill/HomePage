import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import OnlyConnectGame from './OnlyConnectGame';
import OnlyConnectMarkdown from './OnlyConnect.md';

function OnlyConnect() {
  const [markdown, setMarkdown] = useState("");
  fetch(OnlyConnectMarkdown).then(res => res.text()).then(text => setMarkdown(text));

  const answers = [
    ["Apple", "Adam", "Ants", "Anorak"],
    ["Banana", "Badger", "Bert", "Basic"],
    ["Cave", "Coast", "Cliff", "Container"],
    ["Day", "Dessert", "Dave", "Depot"]
  ]

  return (
    <div>
      <p className="page-title">Only Connect Wall</p>
      <div>
        <OnlyConnectGame answers={answers}/>
      </div>
      <div className="page-section">
        <ReactMarkdown source={markdown} />
      </div>
    </div>
  );
}

export default OnlyConnect;
