import React from 'react';
import {connect} from 'react-redux';
import filled from '../media/filled.png';
import unfilled from '../media/unfilled.png';
import * as userActions from '../actions/users';
import {bindActionCreators} from 'redux';
import * as pagesActions from '../actions/pages';

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

class RecentTracks extends React.Component {
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
      recentTracks,
      favorites,
      loggedIn,
    } = this.props;

    return recentTracks ? (
      <div className="recent_tracks__container">
      <div className="track_name spacing_bottom">
        Recent Tracks
      </div>
      {recentTracks.map((track, key) =>
        <div key={key} className="recent_tracks__object">
          <div className="spacing_bottom">
            <div className="track_name">
              {track.name}
            </div>
            <div className="track_artist">
              {track.artist["#text"]}
            </div>
          </div>
          <UserOptionsDisplay
            currentTrack={track}
            favorites={favorites}
            addFavoriteTrack={this.addFavoriteTrack}
            removeFavoriteTrack={this.removeFavoriteTrack}
            loggedIn={loggedIn}
          />
        </div>
      )}
      </div>
    )
    :null;
  }
}

export default connect(
  (state, ownProps) => ({
    favorites: state.users.favorites,
    recentTracks: state.lastfm.recentTracks,
    loggedIn: state.authentication.loggedIn,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    pagesActions: bindActionCreators(pagesActions, dispatch),
  }),
)(RecentTracks);
