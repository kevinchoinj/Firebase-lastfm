import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';

import Artist from './pages/Artist';
import Track from './pages/Track';
import ArtistPanel from './pages/ArtistPanel';
import TrackPanel from './pages/TrackPanel';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import LoginPanel from './pages/LoginPanel';
import Register from './pages/Register';
import RegisterPanel from './pages/RegisterPanel';
import Admin from './pages/Admin';
import DefaultPage from './pages/DefaultPage';
import Favorites from './pages/Favorites';
import FavoritesPanel from './pages/FavoritesPanel';
import Similar from './pages/Similar';
import SimilarPanel from './pages/SimilarPanel';

import SimilarToTrack from './pages/SimilarToTrack';
import SimilarToTrackPanel from './pages/SimilarToTrackPanel';

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
        <Route exact path={"/similar"} children={({ match }) => (
		      <div>
		        <SimilarPanel
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
        <Route exact path={"/similar/:artist/:track"} children={({ match }) => (
		      <div>
		        <SimilarToTrackPanel
              isActive={Boolean(match) ? true : false}
		        />
		      </div>
		    )}/>
        <Route exact path={"/artist/:artist"} children={({ match }) => (
		      <div>
		        <ArtistPanel
              isActive={Boolean(match) ? true : false}
		        />
		      </div>
		    )}/>
        <Route exact path={"/track/:artist/:track"} children={({ match }) => (
		      <div>
		        <TrackPanel
              isActive={Boolean(match) ? true : false}
		        />
		      </div>
		    )}/>
        <Switch>
          <Route
            exact path="/"
            render={(props) => <HomePage {...props}/>}
          />
          <Route
            exact path="/similar"
            render={(props) => <Similar {...props}/>}
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
          <Route
            path="/track/:artist/:track"
            render={(props) => <Track {...props}/>}
          />
          <Route
            path="/artist/:artist"
            render={(props) => <Artist {...props}/>}
          />
          <Route
            path="/similar/:artist/:track"
            render={(props) => <SimilarToTrack {...props}/>}
          />
        </Switch>
      </div>
    );
  }
}

export default App;