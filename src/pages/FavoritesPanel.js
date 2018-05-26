import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import * as lastfmActions from '../actions/lastfm';
import * as pagesActions from '../actions/pages';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import filled from '../media/filled.png';

const FavoritesDisplay = ({favorites, removeFavoriteTrack, requestSimilarOfTrack}) => {
  if (favorites){
    return(
      <div className="favorite_panel__inner">
        {Object.entries(favorites).map((favorite, key)=>
          <div key={key} className="similar_container">
            <img
              src={favorite[1].image}
              alt="favorite"
              onClick={()=>requestSimilarOfTrack({
                artist: favorite[1].artist,
                track: favorite[1].track,
                image: favorite[1].image,
              })}
              className="full_width clickable"
            />
            <div className="track_name">
              {favorite[1].track}
            </div>
            <div className="track_artist">
              {favorite[1].artist}
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


class FavoritesPanel extends React.Component {

  removeFavoriteTrack=(artist, track)=> {
    this.props.userActions.removeFavoriteTrack(artist, track, '/');
  }
  requestSimilarOfTrack = (values) => {
    this.props.lastfmActions.setSimilarOfTrack(values);
    this.props.lastfmActions.requestSimilarOfTrack(values);
    this.props.pagesActions.toggleSimilarOfTrack(true);
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
          requestSimilarOfTrack = {this.requestSimilarOfTrack}
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
    pagesActions: bindActionCreators(pagesActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(FavoritesPanel);
