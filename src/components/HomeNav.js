import React from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as authActions from '../actions/authentication';
import * as pagesActions from '../actions/pages';

const LoginDisplay = ({loggedIn, signOut, toggleSimilarOfTrack, favoritesName}) => {
  if (loggedIn){
    return(
      <div>
        <Link
          className={favoritesName}
          to="/favorites"
          onClick={()=>toggleSimilarOfTrack()}
        >
          Favorites
        </Link>

        <div
          onClick={()=>signOut()}
          className="home_nav__link"
        >
          Log Out
        </div>
      </div>
    )
  }
  else {
    return (
    <div>
      <div>
        <Link
          className="home_nav__link"
          to="/register"
          onClick={()=>toggleSimilarOfTrack()}
        >
          Register
        </Link>
      </div>
      <div>
        <Link
          className="home_nav__link"
          to="/login"
          onClick={()=>toggleSimilarOfTrack()}
        >
          Log In
        </Link>
      </div>
    </div>
    );
  }
};

class HomeNav extends React.Component{
  signOut = () => {
    this.props.authActions.signOutUser();
    this.props.pagesActions.toggleSimilarOfTrack(false);
  }
  toggleSimilarOfTrack=()=> {
    this.props.pagesActions.toggleSimilarOfTrack(false);
  }
  render(){

    const {
      loggedIn,
      pageName,
    } = this.props;

    const homeName= classNames(
      'home_nav__link',
      {
        'home_nav__link--selected': pageName === "lastfmHome",
      }
    );

    const favoritesName= classNames(
      'home_nav__link',
      {
        'home_nav__link--selected': pageName === "lastfmFavorites",
      }
    );



    return(
      <div className="spacing_bottom">
        <Link
          className={homeName}
          to="/"
          onClick = {this.toggleSimilarOfTrack}
        >
          Home
        </Link>
        <LoginDisplay
          favoritesName={favoritesName}
          loggedIn={loggedIn}
          signOut={this.signOut}
          toggleSimilarOfTrack={this.toggleSimilarOfTrack}
        />
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    loggedIn: state.authentication.loggedIn,
    pageName: state.pages.pageName,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(HomeNav);
