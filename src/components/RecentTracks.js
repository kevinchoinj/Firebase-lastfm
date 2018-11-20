import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import * as userActions from 'actions/users';
import * as pagesActions from 'actions/pages';
import * as lastfmActions from 'actions/lastfm';

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
  requestSimilarOfTrack = (values) => {
    this.props.lastfmActions.setSimilarOfTrack(values);
    this.props.lastfmActions.requestSimilarOfTrack(values);
    this.props.pagesActions.toggleSimilarOfTrack(true);
  }
  render() {

    const {
      recentTracks,
      favorites,
      loggedIn,
    } = this.props;

    return recentTracks ? (
      <div className="recent_tracks__container">
      <div className="track_text spacing_bottom">
        Recent Tracks
      </div>
      {recentTracks.map((track, key) =>
        <div key={key} className="recent_tracks__object">
          <div className="spacing_bottom">
            <div>
              <Link
                to={"/track/"+track.artist["#text"]+"/"+track.name}
                className="track_name"
              >
                {track.name}
              </Link>
            </div>
            <div>
              <Link
                to={"/artist/"+track.artist["#text"]}
                className="track_artist"
              >
                {track.artist["#text"]}
              </Link>
            </div>
            <div>
              <Link
                to={"/similar/"+track.artist["#text"]+"/"+track.name}
                className="track_artist"
              >
                Similar Tracks
              </Link>
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
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(RecentTracks);
