/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";

import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import loadable from '@loadable/component';

// import AboutPage from "./AboutPage";
// import FuelSavingsPage from "./containers/FuelSavingsPage";
// import HomePage from "./HomePage";
// import NotFoundPage from "./NotFoundPage";

const AboutPage = loadable(() => import('./AboutPage'));
const FuelSavingsPage = loadable(() => import('./containers/FuelSavingsPage'));
const HomePage = loadable(() => import('./HomePage'));
const NotFoundPage = loadable(() => import('./NotFoundPage'));

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
