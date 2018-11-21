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
      <div className="similar_container">
        <div className="track_image__container">
          <div className="track_image__text">
            <div className="live_indicator">
              LIVE
            </div>
            <div>
              <div className="track_image__text_track">
                <Link to={"/similar/"+currentTrack.artist["#text"]+"/"+currentTrack.name}>
                  {currentTrack.name}
                </Link>
              </div>
              <div className="track_image__text_artist">
                <Link to={"/artist/"+currentTrack.artist["#text"]}>
                  {currentTrack.artist["#text"]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return null;
  }
};

const WatermarkDisplay = ({
  artistInfo
  }) => {
  if (artistInfo){
    if (artistInfo.image){
      return (
        <div
          className="watermark_background"
          style={{backgroundImage:"url("+artistInfo.image[3]["#text"]+")"}}
        />
      )
    }
    else {
      return null;
    }
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
      currentTrack,
    } = this.props;

    return (
      <div>
        <div className="side_left">
        <TrackImage/>
          <div className="side_left__inner">
            <div className="home_header">
              <HomeNav/>
              <LastfmUsernameForm
                onSubmit={this.onSubmit}
              />
            </div>

            <RecentTracks/>
          </div>
        </div>
        <div className="side_right">
          <div className="favorite_panel__inner">
            <WatermarkDisplay
              artistInfo={currentTrack}
            />
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
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(Home);
