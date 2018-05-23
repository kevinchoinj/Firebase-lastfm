import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import {bindActionCreators} from 'redux';

const FavoritesDisplay = ({favorites, removeFavoriteTrack}) => {
  if (favorites){
    return(
      <div>
        {Object.entries(favorites).map((favorite, key)=>
          <div key={key}>
            <img src={favorite[1].image} alt="favorite"/>
            <div>
              {favorite[1].artist}
            </div>
            <div>
              {favorite[1].track}
            </div>
            <div onClick={()=>removeFavoriteTrack(
              favorite[1].artist,
              favorite[1].track)}
            >
              Remove Favorite Track
            </div>
          </div>
        )}
      </div>
    )
  }
  else {
    return (<div></div>);
  }
};


class CheckStatus extends React.Component {

  removeFavoriteTrack=(artist, track)=> {
    this.props.userActions.removeFavoriteTrackThenRedirect(artist, track, '/');
  }

  render() {

    const {
      favorites,
      loggedIn,
    } = this.props;

    return loggedIn ? (
      <div>
        <FavoritesDisplay
          favorites={favorites}
          removeFavoriteTrack = {this.removeFavoriteTrack}
        />
      </div>
    )
    :null;
  }
}

export default connect(
  (state, ownProps) => ({
    loggedIn: state.authentication.loggedIn,
    favorites: state.users.favorites,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
  }),
)(CheckStatus);
