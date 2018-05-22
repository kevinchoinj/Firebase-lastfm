import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import DefaultPage from './pages/DefaultPage';

import CheckStatus from './components/CheckStatus';
import Navbar from './components/Navbar';

import SetUser from './SetUser';
import GetPages from './GetPages';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SetUser/>
        <GetPages/>
        <CheckStatus/>
        <Navbar/>
        <Switch>
          <Route
            exact path="/"
            render={(props) => <Home {...props}/>}
          />
          <Route
            exact path="/register"
            render={(props) => <Register {...props}/>}
          />
          <Route
            exact path="/login"
            render={(props) => <Login {...props}/>}
          />
          <Route
            exact path="/admin"
            render={(props) => <Admin {...props}/>}
          />
          <Route
            path="/test/:id"
            render={(props) => <DefaultPage {...props}/>}
          />
        </Switch>
      </div>
    );
  }
}

export default App;