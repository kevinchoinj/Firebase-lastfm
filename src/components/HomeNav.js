import React from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as authActions from '../actions/authentication';
import * as pagesActions from '../actions/pages';

const LoginDisplay = ({loggedIn, signOut, toggleSimilarOfTrack}) => {
  if (loggedIn){
    return(
      <div>
        <Link
          className="menu_panel__link"
          to="/favorites"
          onClick={()=>toggleSimilarOfTrack()}
        >
          Favorites
        </Link>

        <div
          onClick={()=>signOut()}
          className="menu_panel__link"
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
            className="menu_panel__link"
            to="/register"
            onClick={()=>toggleSimilarOfTrack()}
          >
            Register
          </Link>
        </div>
        <div>
          <Link
            className="menu_panel__link"
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
      isHidden,
    } = this.props;


    return(
      <div
      >
        <Link
          className="menu_panel__link"
          to="/"
          onClick = {this.toggleSimilarOfTrack}
        >
          Home
        </Link>
        <LoginDisplay
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
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(HomeNav);
