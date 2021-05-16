import React from 'react';
import './App.scss';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/Login/LoginPage';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={LoginPage} />
          {/* <Route path="/about"  component={About} />
      <Route path="/contact"  component={Contact} /> */}
        </main>
      </div>
    </BrowserRouter>
  );
};
