import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as lastfmActions from 'actions/lastfm';
import * as pagesActions from 'actions/pages';

import TrackImage from 'components/TrackImage';
import RecentTracks from 'components/RecentTracks';
import HomeNav from 'components/HomeNav';
import LastfmUsernameForm from 'forms/LastfmUsernameForm';

const CurrentTrackDisplay = ({
  currentTrack
  }) => {
  if (currentTrack){
    return (
      <div className="info_container">
        <div className="live_indicator">
          LIVE
        </div>
        <div>
          <div>
            <Link
              to={"/track/"+currentTrack.artist.name+"/"+currentTrack.name}
              className="track_name"
            >
              {currentTrack.name}
            </Link>
          </div>
          <div>
            <Link
              to={"/artist/"+currentTrack.artist.name}
              className="track_artist"
            >
              {currentTrack.artist["#text"]}
            </Link>
          </div>
        </div>
      </div>
    )
  }
  else {
    return null;
  }
};

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
      currentTrack,
    } = this.props;

    return (
      <div>
        <div className="side_left">
          <div className="side_left__inner">
            <div className="home_header">
              <HomeNav/>
              <LastfmUsernameForm
                onSubmit={this.onSubmit}
              />
            </div>
            <div className="track_text">
              <strong>{lastfmUsername}</strong>
            </div>
            <TrackImage/>
            <RecentTracks/>
          </div>
        </div>
        <div className="side_right">
          <div className="favorite_panel__inner">
            <CurrentTrackDisplay
              currentTrack={currentTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    currentTrack: state.lastfm.currentTrack,
    isActive: state.pages.similarOfTrack,
    lastfmUsername: state.lastfm.lastfmUsername,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(Home);
