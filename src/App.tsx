import React from 'react';
// import './App.scss';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import { ChallengePage } from './pages/ChallengePage';
import Home from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from 'react-auth-kit';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <AuthProvider
      authType={'cookie'}
      authName={'_whoami'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'}
    >
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/sign-up" exact component={LoginPage} />
              <Route path="/challenges/:id" exact component={ChallengePage} />

              {/* <Route path="/about"  component={About} />
      <Route path="/contact"  component={Contact} /> */}
            </Switch>
          </main>
        </div>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
};
export default App;
