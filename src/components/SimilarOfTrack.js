import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {history} from 'store';

import * as userActions from 'actions/users';
import * as lastfmActions from 'actions/lastfm';

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
            onClick={(e)=>removeFavoriteTrack(e,similar.artist.name, similar.name)}
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

class SimilarOfTrack extends React.Component {
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
  requestSimilarOfTrack=(values)=> {
    this.props.lastfmActions.setSimilarOfTrack(values);
    this.props.lastfmActions.requestSimilarOfTrack(values);
  }
  goToArtist = (e, link) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(link);
  }
  render() {

    const {
      currentSimilar,
      loggedIn,
      favorites,
      trackInfo,
    } = this.props;


    return currentSimilar && currentSimilar !== [] ? (

      <div className="favorite_panel__inner">
        {trackInfo?
          <div className="similar_container">
            <div className="track_image__container">
              <div className="track_image__text">
                <div className="track_image__text_track">
                  {trackInfo.name}
                </div>
                <Link to={"/artist/"+trackInfo.artist.name}>
                  <div className="track_image__text_artist">
                    {trackInfo.artist.name}
                  </div>
                </Link>
              </div>
            </div>
          </div>
          :null
        }

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
                  <div className="track_image__text_artist" onClick={(e)=>this.goToArtist(e, "/artist/"+similar.artist.name)}>
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
        <div className="panel_notfound">
          Similar tracks not found
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    currentSimilar: state.lastfm.similarOfTrack,
    favorites: state.users.favorites,
    loggedIn: state.authentication.loggedIn,
    trackInfo: state.lastfm.trackInfo,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(SimilarOfTrack);
