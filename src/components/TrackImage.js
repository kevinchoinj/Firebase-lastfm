import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import * as userActions from 'actions/users';
import * as pagesActions from 'actions/pages';

import lastfmImage from 'media/lastfm.png';
import filled from 'media/filled.png';
import unfilled from 'media/unfilled.png';

const UserOptionsDisplay = ({
  loggedIn,
  currentTrack,
  addFavoriteTrack,
  removeFavoriteTrack,
  favorites,
  }) => {
  if (loggedIn){
    return currentTrack ? (
      <div className="current_text spacing_top__small">
        {favorites ?
        [favorites.hasOwnProperty(`${currentTrack.artist["#text"]}-${currentTrack.name}`) ?
          <div key={currentTrack.name}>
            <img
              onClick={(e)=>removeFavoriteTrack(e, currentTrack.artist["#text"], currentTrack.name)}
              src={filled}
              alt="filled"
              className="favorite_icon"
            />
          </div>
          :
          <div key={currentTrack.name}>
            <img
              src={unfilled}
              onClick={(e)=>addFavoriteTrack(e, currentTrack.artist["#text"], currentTrack.name, currentTrack.image[3]["#text"])}
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
  addFavoriteTrack=(e, artist, track, image)=> {
    e.stopPropagation();
    e.preventDefault();
    this.props.userActions.addFavoriteTrack(artist, track, image);
  }
  removeFavoriteTrack=(e,artist, track)=> {
    e.stopPropagation();
    e.preventDefault();
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
        <Link to="/similar">
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
        </Link>
        <div className="current_under">
          <div className="current_text">
            <Link
              to={"/track/"+currentTrack.artist["#text"]+"/"+currentTrack.name}
              className="track_name"
            >
              {currentTrack.name}
            </Link>
          </div>
          <div className="current_text">
            <Link
              to={"/artist/"+currentTrack.artist["#text"]}
              className="track_artist"
            >
              {currentTrack.artist["#text"]}
            </Link>
          </div>
          <UserOptionsDisplay
            currentTrack={currentTrack}
            favorites={favorites}
            addFavoriteTrack={this.addFavoriteTrack}
            removeFavoriteTrack={this.removeFavoriteTrack}
            loggedIn={loggedIn}
          />
        </div>
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
