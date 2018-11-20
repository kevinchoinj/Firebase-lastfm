import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

import * as userActions from 'actions/users';
import * as lastfmActions from 'actions/lastfm';
import * as pagesActions from 'actions/pages';

import CloseButton from 'components/CloseButton';
import {history} from 'store';
import SimilarOfTrack from 'components/SimilarOfTrack';

const WatermarkDisplay = ({
  trackInfo
  }) => {
  if (trackInfo){
    if (trackInfo.album){
      if (trackInfo.album.image){
        return (
          <div
            className="watermark_background"
            style={{backgroundImage:"url("+trackInfo.album.image[3]["#text"]+")"}}
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
  }
  else {
    return null;
  }
};

class FavoritesPanel extends React.Component {
  returnHome = () => {
    history.push("/");
  }
  render() {
    const {
      isActive,
      trackInfo,
    } = this.props;

    const panelName = classNames(
      'favorite_panel',
      {
        'favorite_panel--display': isActive
      }
    );


    return (
      <div className={panelName}>
       <WatermarkDisplay
          trackInfo = {trackInfo}
        />
        <CloseButton
          toggleAction= {this.returnHome}
        />
        <div
          className="back_button"
          onClick={()=>history.goBack()}
        >
          <FontAwesome name="arrow-circle-left"/>
        </div>
        <SimilarOfTrack/>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    trackInfo: state.lastfm.trackInfo,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(FavoritesPanel);
