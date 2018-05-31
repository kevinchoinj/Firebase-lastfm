import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from '../actions/lastfm';
import TrackImage from '../components/TrackImage';
import RecentTracks from '../components/RecentTracks';
import HomeNav from '../components/HomeNav';
import LastfmUsernameForm from '../forms/LastfmUsernameForm';
import * as pagesActions from '../actions/pages';

class Home extends React.Component {
  onSubmit=values=> {
    this.props.lastfmActions.setLastfmUsername(values);
  }
  toggleSimilarOfTrack=(values)=> {
    this.props.pagesActions.toggleSimilarOfTrack(false);
  }
  render() {
    const {
      lastfmUsername,
    } = this.props;

    return (
      <div className="side_left">
        <div className="side_left__inner">
          <div className="home_header">
            <HomeNav/>
            <LastfmUsernameForm
              onSubmit={this.onSubmit}
            />
          </div>
          <div className="lastfm_username">
            {lastfmUsername}
          </div>
          <TrackImage/>
          <RecentTracks/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    isActive: state.pages.similarOfTrack,
    lastfmUsername: state.lastfm.lastfmUsername,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(Home);
