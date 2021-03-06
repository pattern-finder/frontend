import React from 'react';
// import './App.scss';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import { ChallengePage } from './pages/ChallengePage';
import { ChallengeListPage } from './pages/ChallengeListPage';
import Home from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from 'react-auth-kit';
import { Toaster } from 'react-hot-toast';
import { PrivateRoute } from 'react-auth-kit';
import { Profile } from './pages/Profile';
import { ModifyProfile } from './pages/ModifyProfile';
import { CreateChallenge } from './pages/CreateChallenge';
import { CreateSeries } from './pages/CreateSeries';
import { Series } from './pages/SeriesChallenges';
import { ChallengesForSeries } from './pages/ChallengesForSerie';
import { Tuto } from './pages/Tuto';
import background from './assets/background.jpg';

export const App = () => {
  return (
    <AuthProvider
      authType={'cookie'}
      authName={'_whoami'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'}
    >
      <div style={{ backgroundImage: `url(${background})` }}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <main className="h-screen w-full">
              <Switch>
                <Route path="/sign-up" exact component={LoginPage} />
                <Route path="/challenges" exact component={ChallengeListPage} />
                <Route
                  path="/challenges/:id/:language"
                  exact
                  component={ChallengePage}
                />
                <PrivateRoute
                  path="/create/challenge"
                  exact
                  component={CreateChallenge}
                  loginPath="/sign-up"
                />
                <PrivateRoute
                  path="/edit/challenge/:id"
                  exact
                  component={CreateChallenge}
                  loginPath="/sign-up"
                />
                <PrivateRoute
                  path="/create/serie"
                  exact
                  component={CreateSeries}
                  loginPath="/sign-up"
                />
                <PrivateRoute
                  path="/edit/serie/:id"
                  exact
                  component={CreateSeries}
                  loginPath="/sign-up"
                />
                <PrivateRoute
                  path="/serie/:id"
                  exact
                  component={ChallengesForSeries}
                  loginPath="/sign-up"
                />
                <PrivateRoute
                  path="/series"
                  exact
                  component={Series}
                  loginPath="/sign-up"
                />

                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/sign-up" exact component={LoginPage} />
                <PrivateRoute
                  path="/challenges/:id"
                  exact
                  component={ChallengePage}
                  loginPath="/sign-up"
                />
                <Route path="/profile/:id" exact component={Profile} />
                <Route path="/edit/profile" exact component={ModifyProfile} />
                <Route path="/tuto" exact component={Tuto} />
              </Switch>
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthProvider>
  );
};
export default App;
