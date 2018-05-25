import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import DefaultPage from './pages/DefaultPage';
import Favorites from './pages/Favorites';
import SimilarOfTrack from './components/SimilarOfTrack';

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
		        <Favorites
              isActive={Boolean(match) ? true : false}
		        />
		      </div>
		    )}/>
        <SimilarOfTrack/>
        <Switch>
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