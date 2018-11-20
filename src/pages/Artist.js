import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pagesActions from 'actions/pages';
import * as lastfmActions from 'actions/lastfm';

class Artist extends React.Component {
  componentDidMount(){
    this.props.pagesActions.setPage('lastfmArtist');
    this.props.lastfmActions.getArtistInfo({artist:this.props.match.params.artist});
  }
  componentDidUpdate(){
    this.props.lastfmActions.getArtistInfo({artist:this.props.match.params.artist});
  }
  render() {
    return null;
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
    pagesActions: bindActionCreators(pagesActions, dispatch),
  }),
)(Artist);
