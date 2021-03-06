import React, { Component } from 'react';
import Appointment from '../containers/Appointment';
import Home_Landing from './Home_Landing';
import Store from '../containers/Store';
import Checkout from '../containers/Checkout';
import Book_Appointment from '../containers/Book_Appointment';
import { hot } from 'react-hot-loader'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import PageNotFound from './PageNotFound';
import { persistor, store } from './../configureStore';
import createBrowserHistory from "history/createBrowserHistory";

class App extends Component {
  render() {
    return (
    <Router>
      <div>
      <Switch>
       <Route exact path='/' component={Home_Landing} />
        <Route path='/shop' component={Store} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/appointment' component={Appointment} />
        <Route path='/book_appointment/:day/:month' component={Book_Appointment} />
        <Route component={PageNotFound} />
      </Switch>
      </div>
    </Router>
    );
  }
}

export default hot(module)(App);
