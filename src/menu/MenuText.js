import React from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as authActions from '../actions/authentication';
import * as menuActions from '../actions/menu';

const LoginDisplay = ({loggedIn, signOut, toggleMenu}) => {
  if (loggedIn){
    return(
      <div>
        <Link
          className="menu_panel__link"
          to="/favorites"
          onClick={()=>toggleMenu()}
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
            onClick={()=>toggleMenu()}
          >
            Register
          </Link>
        </div>
        <div>
          <Link
            className="menu_panel__link"
            to="/login"
            onClick={()=>toggleMenu()}
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }
};

class MenuText extends React.Component{
  signOut = () => {
    this.props.authActions.signOutUser();
    this.props.menuActions.toggleMenu(!this.props.isHidden);
  }
  toggleMenu = () => {
    this.props.menuActions.toggleMenu(!this.props.isHidden);
  }
  render(){

    const {
      loggedIn,
      isHidden,
    } = this.props;

    const menuClassName = classNames(
      'menu_panel__links',
      {
        'menu_panel__links--hidden':isHidden
      }
    );

    return(
      <div
        className = {menuClassName}
      >
        <Link
          className="menu_panel__link"
          to="/"
          onClick = {this.toggleMenu}
        >
          Home
        </Link>
        <LoginDisplay
          loggedIn={loggedIn}
          signOut={this.signOut}
          toggleMenu={this.toggleMenu}
        />
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    loggedIn: state.authentication.loggedIn,
    isHidden:state.menu.isHidden,
  }),
  dispatch => ({
    menuActions: bindActionCreators(menuActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(MenuText);
