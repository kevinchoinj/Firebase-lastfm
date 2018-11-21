import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as lastfmActions from 'actions/lastfm';

class GetSong extends React.Component{
  componentDidMount(){
    this.props.lastfmActions.getCurrentSimilar({username:this.props.username});

    setInterval(function() {
      this.props.lastfmActions.getCurrentSimilar({username:this.props.username});
    }.bind(this), 4000);

  }
  render(){
    return null;
  }
}
export default connect(
  (state, ownProps) => ({
    username: state.lastfm.lastfmUsername,
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch)}),
)(GetSong);