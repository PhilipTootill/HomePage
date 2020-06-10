import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import Numbers from "./Numbers/Numbers";
import {
  useParams
} from "react-router-dom";

function DigitalGamesDetails() {
  let { name } = useParams();

  const pages = {
    "numbers": <Numbers/>
  } 

  var content = <div>Invalid URL: The page for {name} doesn't exist.</div>;

  if (pages[name] != null) {
    content = pages[name];
  }

  return (
    <div className="page-content">
        {content}
    </div>
  );
}

export default DigitalGamesDetails;
