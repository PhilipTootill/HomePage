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
import BoardGames from './pages/BoardGames';
import DigitalGames from './pages/DigitalGames';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <div className="main-page">
      <Header/>
      <Router>
        <Menu/>
        <div className="main-content">
          <Switch>
            <Route path="/board-games">
              <BoardGames/>
            </Route>
            <Route path="/digital-games">
              <DigitalGames/>
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
