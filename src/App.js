import './App.css';
import React ,{useState, useEffect} from 'react'
import { Transaction } from './Transaction';
import db from './firebase';
import firebase from 'firebase';
import { Header } from './Header';
import { Expenses } from './Expenses';
import { CustomDate } from './CustomDate';
import { CustomName } from './CustomName';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/expenses/date" exact>
            <CustomDate />
          </Route>
          <Route path="/expenses/name" exact>
            <CustomName />
          </Route>
          <Route path="/expenses">
            <Expenses />
          </Route>
          <Route path="/">
            <Header />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
