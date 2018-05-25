import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from '../actions/lastfm';
import TrackImage from '../components/TrackImage';
import SimilarImage from '../components/SimilarImage';
import LastfmUsernameForm from '../forms/LastfmUsernameForm';
import {Link} from 'react-router-dom';
import * as pagesActions from '../actions/pages';

class Home extends React.Component {
  onSubmit=values=> {
    this.props.lastfmActions.setLastfmUsername(values);
  }
  toggleSimilarOfTrack=(values)=> {
    this.props.pagesActions.toggleSimilarOfTrack(false);
  }
  render() {
    return (
      <div>
        <div className="side_left">
          <LastfmUsernameForm
            onSubmit={this.onSubmit}
          />
          <TrackImage/>
          <Link
            to="/"
            onClick={this.toggleSimilarOfTrack}
          >
          Home
          </Link>
          <Link
            to="/favorites"
            onClick={this.toggleSimilarOfTrack}
          >
          Favorites
          </Link>
        </div>
        <div className="side_right">
          <SimilarImage/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    isActive: state.pages.similarOfTrack,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(Home);
