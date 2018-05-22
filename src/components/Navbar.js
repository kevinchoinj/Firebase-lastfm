import React from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../actions/authentication';

class Navbar extends React.Component {
  signOut=()=> {
    this.props.authActions.signOutUser();
  }

  render() {
    const signoutStyle = {
      cursor: "pointer",
    }
    return (
      <div>
        <Link to="/">home</Link>
        <br/>
        <Link to="/register">register</Link>
        <br/>
        <Link to="/login">log in</Link>
        <br/>
        <Link to="/admin">admin</Link>
        <div
          style={signoutStyle}
          onClick={this.signOut}
        >
          log out
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(Navbar);
