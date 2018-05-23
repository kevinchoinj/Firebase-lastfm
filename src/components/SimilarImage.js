import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import {bindActionCreators} from 'redux';

const UserOptionsDisplay = ({loggedIn, similar, addFavoriteTrack, favorites}) => {
  if (loggedIn){
    return favorites ? (
      <div
        onClick={()=>addFavoriteTrack(similar.artist.name, similar.name, similar.image[3]["#text"])}
      >
        Add to favorites
        {`${similar.artist.name}-${similar.name}`}
        {
          favorites.hasOwnProperty(`${similar.artist.name}-${similar.name}`) ?
          <div>is favorited</div>
          :
          <div>not favorited</div>
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
    this.props.userActions.addFavoriteTrack(artist, track, image, '/favorites');
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
