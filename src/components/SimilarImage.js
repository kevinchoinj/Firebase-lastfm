import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import {bindActionCreators} from 'redux';
import filled from '../media/filled.png';
import unfilled from '../media/unfilled.png';

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
            src={filled}
            onClick={()=>removeFavoriteTrack(similar.artist.name, similar.name)}
            alt="filled"
          />
          :
          <img
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

class SimilarImage extends React.Component {
  addFavoriteTrack=(artist, track, image)=> {
    this.props.userActions.addFavoriteTrack(artist, track, image);
  }
  removeFavoriteTrack=(artist, track)=> {
    this.props.userActions.removeFavoriteTrack(artist, track);
  }
  render() {

    const {
      currentSimilar,
      loggedIn,
      favorites,
    } = this.props;

    return currentSimilar ? (
      <div>
        {currentSimilar.map((similar, key) =>
          <div key={key}>
            <img src={similar.image[3]["#text"]} alt="similar"/>
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
    )
    :null;
  }
}

export default connect(
  (state, ownProps) => ({
    currentSimilar: state.lastfm.currentSimilar,
    favorites: state.users.favorites,
    loggedIn: state.authentication.loggedIn,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
  }),
)(SimilarImage);
