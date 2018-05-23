import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../actions/authentication';
import TrackImage from '../components/TrackImage';
import SimilarImage from '../components/SimilarImage';

class Home extends React.Component {
  signOut=()=> {
    this.props.authActions.signOutUser();
  }

  render() {
    return (
      <div>
        <TrackImage/>
        <SimilarImage/>
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
