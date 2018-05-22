import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoginForm from '../forms/LoginForm';
import * as authActions from '../actions/authentication';

class Register extends React.Component {
  onSubmit = values => {
    this.props.authActions.signUpUserThenRedirect(values, '/');
  }

  render() {
    return (
      <div>
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
)(Register);
