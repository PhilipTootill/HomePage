import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import NumbersGame from './NumbersGame';
import NumbersMarkdown from './Numbers.md'

function Numbers() {
  const [markdown, setMarkdown] = useState("");
  fetch(NumbersMarkdown).then(res => res.text()).then(text => setMarkdown(text));


  return (
    <div>
      <p className="page-title">Numbers</p>
      <div>
        <NumbersGame/>
      </div>
      <div className="page-section">
        <ReactMarkdown source={markdown} />
      </div>
    </div>
  );
}

export default Numbers;
