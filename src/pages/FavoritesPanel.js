import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import * as lastfmActions from '../actions/lastfm';
import * as pagesActions from '../actions/pages';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import filled from '../media/filled.png';
import CloseButton from '../components/CloseButton';
import {history} from '../store';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const FavoritesDisplay = ({favorites, removeFavoriteTrack, requestSimilarOfTrack}) => {
  if (favorites){
    return(
      <div className="favorite_panel__inner">
        <div className="track_text info_container">
          <strong>Favorites</strong>
        </div>
        {Object.entries(favorites).map((favorite, key)=>
          <div key={key} className="similar_container">
            <div className="track_image__container">
              <Link
                to={"/similar/"+favorite[1].artist+"/"+favorite[1].track}
              >
                <div
                  className="track_image"
                  style={{backgroundImage: "url("+favorite[1].image+")"}}
                />
              </Link>
            </div>
            <div>
              <Link
                to={"/track/"+favorite[1].artist+"/"+favorite[1].track}
                className="track_name"
              >
                {favorite[1].track}
              </Link>
            </div>
            <div>
              <Link
                to={"/artist/"+favorite[1].artist}
                className="track_artist"
              >
                {favorite[1].artist}
              </Link>
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

  returnHome = () => {
    history.push("/");
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
        <CloseButton
          toggleAction= {this.returnHome}
        />
        <div
          className="back_button"
          onClick={()=>history.goBack()}
        >
          <FontAwesome name="arrow-circle-left"/>
        </div>
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
    pagesActions: bindActionCreators(pagesActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(FavoritesPanel);
