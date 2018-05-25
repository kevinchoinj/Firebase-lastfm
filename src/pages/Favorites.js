import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import filled from '../media/filled.png';

const FavoritesDisplay = ({favorites, removeFavoriteTrack}) => {
  if (favorites){
    return(
      <div className="favorite_panel__inner">
        {Object.entries(favorites).map((favorite, key)=>
          <div key={key} className="similar_container">
            <img src={favorite[1].image} alt="favorite"/>
            <div>
              {favorite[1].artist}
            </div>
            <div>
              {favorite[1].track}
            </div>
            <div>
              <img
                className="favorite_icon"
                src={filled}
                onClick={()=>removeFavoriteTrack(
                favorite[1].artist,
                favorite[1].track)}
                alt="filled"
              />
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
    this.props.userActions.removeFavoriteTrack(artist, track, '/');
  }

  render() {

    const {
      favorites,
      loggedIn,
      isActive,
    } = this.props;

    const panelName = classNames(
      'favorite_panel',
      {
        'favorite_panel--display': isActive
      }
    );

    return loggedIn ? (
      <div className={panelName}>
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
