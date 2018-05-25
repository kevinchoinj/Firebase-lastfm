import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import * as lastfmActions from '../actions/lastfm';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import filled from '../media/filled.png';
import unfilled from '../media/unfilled.png';
import CloseButton from './CloseButton';

const UserOptionsDisplay = ({
  loggedIn,
  similar,
  addFavoriteTrack,
  removeFavoriteTrack,
  favorites,
  }) => {
  if (loggedIn){
    return favorites ? (
      <div>
        {favorites.hasOwnProperty(`${similar.artist.name}-${similar.name}`) ?
          <img
            className="favorite_icon"
            src={filled}
            onClick={()=>removeFavoriteTrack(similar.artist.name, similar.name)}
            alt="filled"
          />
          :
          <img
            className="favorite_icon"
            src={unfilled}
            onClick={()=>addFavoriteTrack(similar.artist.name, similar.name, similar.image[3]["#text"])}
            alt="unfilled"
          />
        }
      </div>
    ):null
  }
  else {
    return null;
  }
};

class SimilarOfTrack extends React.Component {
  addFavoriteTrack=(artist, track, image)=> {
    this.props.userActions.addFavoriteTrack(artist, track, image);
  }
  removeFavoriteTrack=(artist, track)=> {
    this.props.userActions.removeFavoriteTrack(artist, track);
  }
  requestSimilarOfTrack=(values)=> {
    this.props.lastfmActions.requestSimilarOfTrack(values);
  }
  render() {

    const {
      currentSimilar,
      loggedIn,
      favorites,
      isActive,
    } = this.props;

    const panelName = classNames(
      'favorite_panel',
      {
        'favorite_panel--display': isActive
      }
    );

    return currentSimilar ? (
      <div className={panelName}>
        <CloseButton />
        <div className="favorite_panel__inner">
          {currentSimilar.map((similar, key) =>
            <div key={key} className="similar_container">
              <img
                src={similar.image[3]["#text"]}
                alt="similar"
                onClick={()=>this.requestSimilarOfTrack({artist: similar.artist.name, track: similar.name})}
                className="full_width clickable"
              />
              <div>
                {similar.artist.name}
              </div>
              <div>
                {similar.name}
              </div>
              <UserOptionsDisplay
                loggedIn={loggedIn}
                addFavoriteTrack = {this.addFavoriteTrack}
                removeFavoriteTrack={this.removeFavoriteTrack}
                similar={similar}
                favorites={favorites}
              />
            </div>
          )}
        </div>
      </div>
    )
    :null;
  }
}

export default connect(
  (state, ownProps) => ({
    currentSimilar: state.lastfm.similarOfTrack,
    favorites: state.users.favorites,
    loggedIn: state.authentication.loggedIn,
    isActive: state.pages.similarOfTrack,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(SimilarOfTrack);
