import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import {bindActionCreators} from 'redux';

const UserOptionsDisplay = ({loggedIn, similar, addFavoriteTrack}) => {
  if (loggedIn){
    return (
      <div onClick={()=>addFavoriteTrack(similar.artist.name, similar.name, similar.image[3]["#text"])}>
        Add to favorites
      </div>
    )
  }
  else {
    return null;
  }
};

class SimilarImage extends React.Component {
  addFavoriteTrack=(artist, track, image)=> {
    this.props.userActions.addFavoriteTrackThenRedirect(artist, track, image, '/favorites');
  }

  render() {

    const {
      currentSimilar,
      loggedIn,
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
    loggedIn: state.authentication.loggedIn,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
  }),
)(SimilarImage);
