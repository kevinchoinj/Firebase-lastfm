import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as lastfmActions from '../actions/lastfm';

class GetSong extends React.Component{
  componentDidMount(){
    this.props.lastfmActions.getCurrentSimilar({username:'shodyra'});
    /*
    setInterval(function() {
      this.props.lastfmActions.getCurrentSimilar({username:'shodyra'});
    }.bind(this), 4000);
    */
  }
  render(){
    return null;
  }
}
export default connect(
  () => ({}),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch)}),
)(GetSong);