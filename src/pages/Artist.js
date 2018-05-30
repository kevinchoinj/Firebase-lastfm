import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pagesActions from '../actions/pages';

class Register extends React.Component {
  componentDidMount(){
    this.props.pagesActions.setPageName('lastfmArtist');
  }
  render() {
    return (
      <div className="side_right">
      artist
        {this.props.match.params.artist}
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
  }),
)(Register);
