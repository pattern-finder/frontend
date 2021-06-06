import './App.scss';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';


export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-up" exact component={LoginPage} />
            <Route path="/About" exact component={About} />
            <Route path="/Contact" exact component={Contact} />

            {/* <Route path="/about"  component={About} />
      <Route path="/contact"  component={Contact} /> */}
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};
export default App;
