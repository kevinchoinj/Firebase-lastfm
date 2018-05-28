import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import LoginPanel from './pages/LoginPanel';
import Register from './pages/Register';
import RegisterPanel from './pages/RegisterPanel';
import Admin from './pages/Admin';
import DefaultPage from './pages/DefaultPage';
import Favorites from './pages/Favorites';
import FavoritesPanel from './pages/FavoritesPanel';
import SimilarOfTrackPanel from './components/SimilarOfTrackPanel';

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
        <Home />
        <Route exact path={"/favorites"} children={({ match }) => (
		      <div>
		        <FavoritesPanel
              isActive={Boolean(match) ? true : false}
		        />
		      </div>
		    )}/>
        <Route exact path={"/login"} children={({ match }) => (
		      <div>
		        <LoginPanel
              isActive={Boolean(match) ? true : false}
		        />
		      </div>
		    )}/>
        <Route exact path={"/register"} children={({ match }) => (
		      <div>
		        <RegisterPanel
              isActive={Boolean(match) ? true : false}
		        />
		      </div>
		    )}/>
        <SimilarOfTrackPanel/>
        <Switch>
          <Route
            exact path="/"
            render={(props) => <HomePage {...props}/>}
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
            exact path="/favorites"
            render={(props) => <Favorites {...props}/>}
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