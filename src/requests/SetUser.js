import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authActions from '../actions/authentication';

class SetUser extends React.Component{
  setUser = email => {
    this.props.authActions.setCurrentUser(email);
  }
  componentDidMount(){
    this.props.authActions.getCurrentUser();
  }
  render(){
    return null;
  }
}
export default connect(
  () => ({}),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)}),
)(SetUser);