import React from 'react';
// import './App.scss';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import { ChallengePage } from './pages/ChallengePage';
import { ChallengeList } from './pages/ChallengeList';
import Home from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { CreateChallenge } from './pages/Create';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/sign-up" exact component={LoginPage} />
            <Route path="/challenges" exact component={ChallengeList} />
            <Route path="/challenges/:id" exact component={ChallengePage} />
            <Route path="/create" exact component={CreateChallenge} />

            {/* <Route path="/about"  component={About} />
      <Route path="/contact"  component={Contact} /> */}
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};
export default App;
