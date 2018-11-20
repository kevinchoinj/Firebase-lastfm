import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as authActions from 'actions/authentication';

import LoginForm from 'forms/LoginForm';

class RegisterPanel extends React.Component {
  onSubmit = values => {
    this.props.authActions.signUpUserThenRedirect(values, '/');
  }
  render() {
    const {
      isActive,
    } = this.props;

    const panelName = classNames(
      'half_panel',
      {
        'half_panel--display': isActive,
      }
    );

    return (
      <div className={panelName}>
        <div className="half_panel__inner">
          <div className="spacing_bottom">
          Register
          </div>
          <LoginForm onSubmit={this.onSubmit}/>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(RegisterPanel);
