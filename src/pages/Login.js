import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoginForm from '../forms/LoginForm';
import * as authActions from '../actions/authentication';

class Login extends React.Component {
  onSubmit = values => {
    this.props.authActions.signInUserThenRedirect(values, '/');
  };

  render() {
    return (
      <div>
        Login
        <br/>
        <LoginForm onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(Login);
