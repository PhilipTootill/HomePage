import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Index from './Index';
import Herakles from './Herakles';

function BoardGames() {
  return (
    <Switch>
      <Route path="/board-games/index">
        <Index/>
      </Route>
      <Route path="/board-games/herakles">
        <Herakles/>
      </Route>
  </Switch>
  );
}

export default BoardGames;
