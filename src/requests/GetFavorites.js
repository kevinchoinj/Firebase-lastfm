import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as userActions from '../actions/users';

class GetSong extends React.Component{
  componentDidMount(){
    this.props.userActions.getFavorites();
  }
  render(){
    return null;
  }
}
export default connect(
  () => ({}),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)}),
)(GetSong);