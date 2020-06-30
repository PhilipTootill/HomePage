import React from 'react';
import Numbers from "./Numbers/Numbers";
import OnlyConnect from "./OnlyConnect/OnlyConnect";
import Millionaire from "./Millionaire/Millionaire";
import {
  useParams
} from "react-router-dom";
import PocketHexes from './PocketHexes/PocketHexes';

function DigitalGamesDetails() {
  let { name } = useParams();

  const pages = {
    "numbers": <Numbers/>,
    "pocket-hexes": <PocketHexes/>,
    "only-connect": <OnlyConnect/>,
    "millionaire": <Millionaire/>
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
