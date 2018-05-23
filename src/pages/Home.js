import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from '../actions/lastfm';
import TrackImage from '../components/TrackImage';
import SimilarImage from '../components/SimilarImage';
import LastfmUsernameForm from '../forms/LastfmUsernameForm';

class Home extends React.Component {
  onSubmit=values=> {
    this.props.lastfmActions.setLastfmUsername(values);
  }

  render() {
    return (
      <div>
        <LastfmUsernameForm
          onSubmit={this.onSubmit}
        />
        <TrackImage/>
        <SimilarImage/>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(Home);
