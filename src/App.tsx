import React from "react";
import "./App.scss";
import { Router, Link, Route } from "react-router-dom"
import { LoginPage } from "./pages/Login/LoginPage";

export const App = () => {
  

    return (
      <Router>
      <main>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
  
      <Route path="/" exact component={LoginPage} />
      {/* <Route path="/about"  component={About} />
      <Route path="/contact"  component={Contact} /> */}
  
      </main>
  </Router>
    )
}
