import React from 'react';
import {connect} from 'react-redux';
import filled from '../media/filled.png';
import unfilled from '../media/unfilled.png';
import * as userActions from '../actions/users';
import {bindActionCreators} from 'redux';
import * as pagesActions from '../actions/pages';
import lastfmImage from '../media/lastfm.png';

const UserOptionsDisplay = ({
  loggedIn,
  currentTrack,
  addFavoriteTrack,
  removeFavoriteTrack,
  favorites,
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
  toggleSimilarOfTrack = () => {
    this.props.pagesActions.toggleSimilarOfTrack(false);
  }
  render() {

    const {
      currentTrack,
      favorites,
      loggedIn,
    } = this.props;

    return currentTrack ? (
      <div className="current_container">
        {currentTrack.image[3] && (currentTrack.image[3]["#text"] !== "") ?
        <img
          src={currentTrack.image[3]["#text"]}
          alt="track"
          className="full_width"
          onClick = {this.toggleSimilarOfTrack}
        />
        :
        <img
          src={lastfmImage}
          alt="lastfm"
          className="full_width"
          onClick = {this.toggleSimilarOfTrack}
        />
        }
        <div className="track_name">
        {currentTrack.name}
        </div>
        <div className="track_artist">
        {currentTrack.artist["#text"]}
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
    pagesActions: bindActionCreators(pagesActions, dispatch),
  }),
)(TrackImage);
