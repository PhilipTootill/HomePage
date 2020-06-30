import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import MillionaireApp from './MillionaireApp';
import MillionaireMarkdown from './Millionaire.md';

function Millionaire() {
  const [markdown, setMarkdown] = useState("");
  fetch(MillionaireMarkdown).then(res => res.text()).then(text => setMarkdown(text));

  return (
    <div>
      <p className="page-title">Who Wants To Be A Millionaire?</p>
      <div>
        <MillionaireApp/>
      </div>
      <div className="page-section">
        <ReactMarkdown source={markdown} />
      </div>
    </div>
  );
}

export default Millionaire;
