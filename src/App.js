import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import DefaultPage from './pages/DefaultPage';
import Favorites from './pages/Favorites';

import MenuWrap from './menu/MenuWrap';

import SetUser from './requests/SetUser';
import GetPages from './requests/GetPages';
import GetSong from './requests/GetSong';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SetUser/>
        <GetPages/>
        <GetSong/>
        <MenuWrap/>
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
            exact path="/favorites"
            render={(props) => <Favorites {...props}/>}
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