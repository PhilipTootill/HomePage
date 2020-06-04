import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import HeraklesMarkdown from "./Herakles.md";
import TheVinylAgeMarkdown from "./TheVinylAge.md";
import PyxisMarkdown from "./Pyxis.md";
import RulesIncMarkdown from "./RulesInc.md";
import InternsOfHadesMarkdown from "./InternsOfHades.md";
import {
  useParams
} from "react-router-dom";

function BoardGamesDetails() {
  let { name } = useParams();

  const defaultMarkdown = "Invalid URL: The page for " + name + " doesn't exist.";
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const markdownPages = {
    "herakles": HeraklesMarkdown,
    "the-vinyl-age": TheVinylAgeMarkdown,
    "rules-inc": RulesIncMarkdown,
    "interns-of-hades": InternsOfHadesMarkdown,
    "pyxis": PyxisMarkdown
  } 

  if (markdownPages[name] != null) {
    fetch(markdownPages[name]).then(res => res.text()).then(text => setMarkdown(text));
  }

  return (
    <div className="page-content">
      <div className="page-section">
        <ReactMarkdown source={markdown} />
      </div>
    </div>
  );
}

export default BoardGamesDetails;
