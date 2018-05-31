import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users';
import * as lastfmActions from '../actions/lastfm';
import * as pagesActions from '../actions/pages';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import CloseButton from '../components/CloseButton';
import {history} from '../store';
import SimilarOfTrack from '../components/SimilarOfTrack';
import FontAwesome from 'react-fontawesome';

class FavoritesPanel extends React.Component {
  returnHome = () => {
    history.push("/");
  }
  render() {
    const {
      loggedIn,
      isActive,
    } = this.props;

    const panelName = classNames(
      'favorite_panel',
      {
        'favorite_panel--display': isActive
      }
    );

    return loggedIn ? (
      <div className={panelName}>
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
    :null;
  }
}

export default connect(
  (state, ownProps) => ({
    loggedIn: state.authentication.loggedIn,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(FavoritesPanel);
