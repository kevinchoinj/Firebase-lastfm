import React from 'react';
import {connect} from 'react-redux';
import filled from '../media/filled.png';
import unfilled from '../media/unfilled.png';
import * as userActions from '../actions/users';
import {bindActionCreators} from 'redux';

const UserOptionsDisplay = ({
  loggedIn,
  currentTrack,
  addFavoriteTrack,
  removeFavoriteTrack,
  favorites
  }) => {
  if (loggedIn){
    return currentTrack ? (
      <div>
        {favorites ?
        [favorites.hasOwnProperty(`${currentTrack.artist["#text"]}-${currentTrack.name}`) ?
          <div key={currentTrack.name}>
            <img
              onClick={()=>removeFavoriteTrack(currentTrack.artist["#text"], currentTrack.name)}
              src={filled}
              alt="filled"
              className="favorite_icon"
            />
          </div>
          :
          <div key={currentTrack.name}>
            <img
              src={unfilled}
              onClick={()=>addFavoriteTrack(currentTrack.artist["#text"], currentTrack.name, currentTrack.image[3]["#text"])}
              alt="unfilled"
              className="favorite_icon"
            />
          </div>
        ]
        :null}
      </div>
    ):null
  }
  else {
    return null;
  }
};

class TrackImage extends React.Component {
  addFavoriteTrack=(artist, track, image)=> {
    this.props.userActions.addFavoriteTrack(artist, track, image);
  }
  removeFavoriteTrack=(artist, track)=> {
    this.props.userActions.removeFavoriteTrack(artist, track);
  }
  render() {

    const {
      currentTrack,
      favorites,
      loggedIn,
    } = this.props;

    return currentTrack ? (
      <div className="current_container">
        {currentTrack.image[3]?
        <img
          src={currentTrack.image[3]["#text"]}
          alt="track"
          className="full_width"
        />
        :null}
        <div>
        {currentTrack.artist["#text"]}
        </div>
        <div>
        {currentTrack.name}
        </div>
        <UserOptionsDisplay
          currentTrack={currentTrack}
          favorites={favorites}
          addFavoriteTrack={this.addFavoriteTrack}
          removeFavoriteTrack={this.removeFavoriteTrack}
          loggedIn={loggedIn}
        />
      </div>
    )
    :null;
  }
}

export default connect(
  (state, ownProps) => ({
    favorites: state.users.favorites,
    currentTrack: state.lastfm.currentTrack,
    loggedIn: state.authentication.loggedIn,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
  }),
)(TrackImage);
