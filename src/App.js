import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import About from './pages/About';
import BoardGamesIndex from './pages/boardGames/BoardGamesIndex';
import BoardGamesDetails from './pages/boardGames/BoardGamesDetails';
import DigitalGamesIndex from './pages/digitalGames/DigitalGamesIndex';
import DigitalGamesDetails from './pages/digitalGames/DigitalGamesDetails';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <div className="main-page">
      <Header/>
      <Router basename={`${process.env.PUBLIC_URL}/`}>
        <Menu/>
        <div className="main-content">
          <Switch>
            <Route exact path="/board-games">
              <BoardGamesIndex/>
            </Route>
            <Route path="/board-games/:name">
              <BoardGamesDetails/>
            </Route>
            <Route exact path="/digital-games">
              <DigitalGamesIndex/>
            </Route>
            <Route path="/digital-games/:name">
              <DigitalGamesDetails/>
            </Route>
            <Route path="/contact">
              <Contact/>
            </Route>
            <Route path="/">
              <About/>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
