import React from 'react';
import {connect} from 'react-redux';
import GetFavorites from '../requests/GetFavorites';

const FavoritesDisplay = ({favorites}) => {
  if (favorites){
    return(
      <div>
        {
      favorites.map((favorite, key)=>
        <div key={key}>
          <img src={favorite.image} alt="favorite"/>
        <div>
          {favorite.artist}
        </div>
        <div>
          {favorite.track}
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
  render() {

    const {
      favorites,
      loggedIn,
    } = this.props;

    return loggedIn ? (
      <div>
        <GetFavorites />
        <FavoritesDisplay
          favorites={favorites}
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
  }),
)(CheckStatus);
