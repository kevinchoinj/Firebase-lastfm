import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import * as lastfmActions from '../actions/lastfm';
import * as pagesActions from '../actions/pages';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import CloseButton from './CloseButton';
import SimilarOfTrack from './SimilarOfTrack';

class SimilarOfTrackPanel extends React.Component {
  addFavoriteTrack=(artist, track, image)=> {
    this.props.userActions.addFavoriteTrack(artist, track, image);
  }
  removeFavoriteTrack=(artist, track)=> {
    this.props.userActions.removeFavoriteTrack(artist, track);
  }
  requestSimilarOfTrack=(values)=> {
    this.props.lastfmActions.setSimilarOfTrack(values);
    this.props.lastfmActions.requestSimilarOfTrack(values);
  }
  toggleSimilarOfTrack = () => {
    this.props.pagesActions.toggleSimilarOfTrack(false);
  }
  render() {

    const {
      isActive,
    } = this.props;

    const panelName = classNames(
      'favorite_panel',
      {
        'favorite_panel--display': isActive
      }
    );

    return(
      <div className={panelName}>
        <CloseButton
          toggleAction= {this.toggleSimilarOfTrack}
        />
        <SimilarOfTrack/>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    isActive: state.pages.similarOfTrack,
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
    pagesActions: bindActionCreators(pagesActions, dispatch),
  }),
)(SimilarOfTrackPanel);
