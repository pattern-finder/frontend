import React from "react";
import "./App.scss";
import { Link, Route, BrowserRouter } from "react-router-dom"
import { LoginPage } from "./pages/Login/LoginPage";
import logo from "./assets/PicSpyLogo.png"
import { CodeRunning } from "./pages/code_running/CodeRunning";


export const App = () => {

  return (
    <BrowserRouter >
      <div className="App">
        <main>
        <div className="header">
          <div className="logo">
            <img alt="logo" src={logo} />
          </div>
          <div className="navMenu">
            <nav>
              <ul>
                <li><Link to="/">Overview</Link></li>
                <li><Link to="/code">Liste des exercices</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <Route path="/" exact component={LoginPage} />
        <Route path="/code" component={CodeRunning} />
        {/* <Route path="/contact"  component={Contact} /> */}

        </main>
      </div>
    </BrowserRouter >
  )
}
