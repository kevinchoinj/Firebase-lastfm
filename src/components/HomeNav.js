import React from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from 'actions/authentication';
import * as pagesActions from 'actions/pages';

const LinkSelected = ({isSelected, children}) => {
  if (isSelected) {
    return (
      <div className="home_nav__link--selected">
        {children}
      </div>
    )
  }
  else {
    return (
      <div className="home_nav__link">
        {children}
      </div>
    )
  }
}

const LoginDisplay = ({loggedIn, signOut, toggleSimilarOfTrack, favoritesSelected, registerSelected, loginSelected}) => {
  if (loggedIn){
    return(
      <div>
        <LinkSelected isSelected={favoritesSelected}>
          <Link
            to="/favorites"
            onClick={()=>toggleSimilarOfTrack()}
          >
            Favorites
          </Link>
        </LinkSelected>
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
      <LinkSelected isSelected={registerSelected}>
        <Link
          to="/register"
          onClick={()=>toggleSimilarOfTrack()}
        >
          Register
        </Link>
      </LinkSelected>
      <LinkSelected isSelected={loginSelected}>
        <Link
          to="/login"
          onClick={()=>toggleSimilarOfTrack()}
        >
          Log In
        </Link>
      </LinkSelected>
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
      currentPage,
    } = this.props;

    return(
      <div className="spacing_bottom">
        <LinkSelected isSelected= {currentPage==="lastfmHome"}>
          <Link
            to="/"
            onClick = {this.toggleSimilarOfTrack}
          >
            Home
          </Link>
        </LinkSelected>

        <LinkSelected isSelected= {currentPage==="lastfmSimilar"}>
          <Link
            to="/similar"
            onClick = {this.toggleSimilarOfTrack}
          >
            Similar
          </Link>
        </LinkSelected>

        <LoginDisplay
          favoritesSelected={currentPage === "lastfmFavorites"}
          registerSelected={currentPage === "lastfmRegister"}
          loginSelected={currentPage === "lastfmLogin"}
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
    currentPage: state.pages.currentPage,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(HomeNav);
