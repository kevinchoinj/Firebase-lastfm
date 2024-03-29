import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import * as userActions from 'actions/users';
import * as lastfmActions from 'actions/lastfm';
import * as pagesActions from 'actions/pages';

import filled from 'media/filled.png';
import unfilled from 'media/unfilled.png';

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
            onClick={(e)=>removeFavoriteTrack(e, similar.artist.name, similar.name)}
            alt="filled"
          />
          :
          <img
            className="favorite_icon"
            src={unfilled}
            onClick={(e)=>addFavoriteTrack(e, similar.artist.name, similar.name, similar.image[2]["#text"])}
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

const CurrentTrackDisplay = ({
  currentTrack
  }) => {
  if (currentTrack){
    return (
      <div className="similar_container">
        <div className="track_image__container">
          <div className="track_image__text">
            <div className="live_indicator">
              LIVE
            </div>
            <div>
              <div className="track_image__text_track">
                <Link to={"/similar/"+currentTrack.artist["#text"]+"/"+currentTrack.name}>
                  {currentTrack.name}
                </Link>
              </div>
              <div className="track_image__text_artist">
                <Link to={"/artist/"+currentTrack.artist["#text"]}>
                  {currentTrack.artist["#text"]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return null;
  }
};

class SimilarImage extends React.Component {
  addFavoriteTrack=(e, artist, track, image)=> {
    e.stopPropagation();
    e.preventDefault();
    this.props.userActions.addFavoriteTrack(artist, track, image);
  }
  removeFavoriteTrack=(e, artist, track)=> {
    e.stopPropagation();
    e.preventDefault();
    this.props.userActions.removeFavoriteTrack(artist, track);
  }
  requestSimilarOfTrack = (values) => {
    this.props.lastfmActions.setSimilarOfTrack(values);
    this.props.lastfmActions.requestSimilarOfTrack(values);
    this.props.pagesActions.toggleSimilarOfTrack(true);
  }
  render() {

    const {
      currentSimilar,
      loggedIn,
      favorites,
      currentTrack,
    } = this.props;

    return currentSimilar && currentSimilar[0] ? (
      <div className="favorite_panel__inner">

        <CurrentTrackDisplay
          currentTrack={currentTrack}
        />

        {currentSimilar.map((similar, key) =>
          <div key={key} className="similar_container">
            <Link to={"/similar/"+similar.artist.name+"/"+similar.name}>
              <div className="track_image__container">
                <img src={similar.image[2]["#text"]} className="track_image" alt="track"/>
                <div className="track_image__overlay"/>
                <div className="track_image__text">
                  <div className="track_image__text_track">
                    {similar.name}
                  </div>
                  <div className="track_image__text_artist">
                    {similar.artist.name}
                  </div>
                  <UserOptionsDisplay
                    loggedIn={loggedIn}
                    addFavoriteTrack = {this.addFavoriteTrack}
                    removeFavoriteTrack={this.removeFavoriteTrack}
                    similar={similar}
                    favorites={favorites}
                  />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    )
    :
    (
      <div className="favorite_panel__inner">
        <CurrentTrackDisplay
          currentTrack={currentTrack}
        />
        <div className="info_container track_text">
          Similar tracks not found
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    currentSimilar: state.lastfm.currentSimilar,
    favorites: state.users.favorites,
    loggedIn: state.authentication.loggedIn,
    currentTrack: state.lastfm.currentTrack
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(SimilarImage);
