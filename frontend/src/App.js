import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './containers/Home'
import AllRef from './containers/AllRef'
import { DocumentContextProvider } from './DocumentContext';
import './app.css';

function App() {
  return (
    <Router>
      <DocumentContextProvider>
      <main className="wrapper">
        <nav className="navigation">
          <section className="container">
            <Link to="/" className="navigation-title">Home</Link>
            <Link to="/about" className="navigation-title">References</Link>
          </section>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <AllRef />
          </Route>
        </Switch>
      </main>
      </DocumentContextProvider>
    </Router>
  );
}



export default App;


