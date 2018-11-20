import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pagesActions from 'actions/pages';
import * as lastfmActions from 'actions/lastfm';

class Similar extends React.Component {
  componentDidMount(){
    this.props.pagesActions.setPage('lastfmSimilarMisc');
    this.props.lastfmActions.getTrackInfo({
      track:this.props.match.params.track,
      artist:this.props.match.params.artist,
    });
    this.props.lastfmActions.requestSimilarOfTrack({
      track:this.props.match.params.track,
      artist:this.props.match.params.artist,
    });
  }
  componentDidUpdate(){
    this.props.lastfmActions.getTrackInfo({
      track:this.props.match.params.track,
      artist:this.props.match.params.artist,
    });
    this.props.lastfmActions.requestSimilarOfTrack({
      track:this.props.match.params.track,
      artist:this.props.match.params.artist,
    });
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
)(Similar);
