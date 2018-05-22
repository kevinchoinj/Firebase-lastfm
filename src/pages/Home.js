import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../actions/authentication';
import DefaultPageList from '../components/DefaultPageList';

class Home extends React.Component {
  signOut=()=> {
    this.props.authActions.signOutUser();
  }

  render() {
    return (
      <div>
        Home
        <DefaultPageList/>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(Home);
