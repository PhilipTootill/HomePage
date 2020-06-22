import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import OnlyConnectApp from './OnlyConnectApp';
import OnlyConnectMarkdown from './OnlyConnect.md';

function OnlyConnect() {
  const [markdown, setMarkdown] = useState("");
  fetch(OnlyConnectMarkdown).then(res => res.text()).then(text => setMarkdown(text));

  return (
    <div>
      <p className="page-title">Only Connect Wall</p>
      <div>
        <OnlyConnectApp/>
      </div>
      <div className="page-section">
        <ReactMarkdown source={markdown} />
      </div>
    </div>
  );
}

export default OnlyConnect;
