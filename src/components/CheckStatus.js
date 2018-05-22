import React from 'react';
import {connect} from 'react-redux';

class CheckStatus extends React.Component {

  render() {
    const {
      loggedIn,
    } = this.props;
    return loggedIn ? (
      <div>
      logged in
      </div>
    ):
    (
      <div>
        not logged in
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    loggedIn: state.authentication.loggedIn,
  }),
  dispatch => ({
  }),
)(CheckStatus);
