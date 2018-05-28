import React from 'react';
import {connect} from 'react-redux';
import LoginForm from '../forms/LoginForm';
import * as authActions from '../actions/authentication';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

class LoginPanel extends React.Component {
  onSubmit = values => {
    this.props.authActions.signInUserThenRedirect(values, '/');
  };
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
            Login
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
)(LoginPanel);
