import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import * as lastfmActions from '../actions/lastfm';
import {bindActionCreators} from 'redux';
import filled from '../media/filled.png';
import unfilled from '../media/unfilled.png';
import {Link} from 'react-router-dom';

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
            onClick={()=>addFavoriteTrack(similar.artist.name, similar.name, similar.image[2]["#text"])}
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

const WatermarkDisplay = ({
  trackInfo
  }) => {
  if (trackInfo){
    if (trackInfo.album){
      if (trackInfo.album.image){
        return (
          <div
            className="watermark_background"
            style={{backgroundImage:"url("+trackInfo.album.image[3]["#text"]+")"}}
          />
        )
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
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
    this.props.lastfmActions.setSimilarOfTrack(values);
    this.props.lastfmActions.requestSimilarOfTrack(values);
  }
  render() {

    const {
      currentSimilar,
      loggedIn,
      favorites,
      similarBase,
      trackInfo,
    } = this.props;


    return currentSimilar && currentSimilar !== [] ? (

      <div className="favorite_panel__inner">
        <WatermarkDisplay
          trackInfo = {trackInfo}
        />

        <div className="similar_container">
          <div className="track_name">
            {trackInfo.name}
          </div>
          <div className="track_artist">
            {trackInfo.artist.name}
          </div>
        </div>

        {currentSimilar.map((similar, key) =>
          <div key={key} className="similar_container">
            <div className="track_image__container">
              <Link
                to={"/similar/"+similar.artist.name+"/"+similar.name}
              >
              <div
                className="track_image"
                style={{backgroundImage: "url("+similar.image[2]["#text"]+")"}}
              />
              </Link>
            </div>
            <div>
              <Link
                to={"/track/"+similar.artist.name+"/"+similar.name}
                className="track_name"
              >
                {similar.name}
              </Link>
            </div>
            <div>
              <Link
                to={"/artist/"+similar.artist.name}
                className="track_artist"
              >
                {similar.artist.name}
              </Link>
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
    similarBase: state.lastfm.similarOfBase,
    trackInfo: state.lastfm.trackInfo,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(SimilarOfTrack);
