import React from "react";
import "./App.scss";
import { Link, Route, BrowserRouter } from "react-router-dom"
import { LoginPage } from "./pages/Login/LoginPage";
import { CodeRunning } from "./pages/code_running/CodeRunning";


export const App = () => {

  return (
    <BrowserRouter >
      <div className="App">
        <main>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>



          <Route path="/" exact component={LoginPage} />
           <Route path="/code"  component={CodeRunning} />
      {/* <Route path="/contact"  component={Contact} /> */}

        </main>
      </div>
    </BrowserRouter>
  )
}
