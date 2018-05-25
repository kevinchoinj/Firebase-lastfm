import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lastfmActions from '../actions/lastfm';
import TrackImage from '../components/TrackImage';
import SimilarImage from '../components/SimilarImage';
import LastfmUsernameForm from '../forms/LastfmUsernameForm';
import {Link} from 'react-router-dom';

class Home extends React.Component {
  onSubmit=values=> {
    this.props.lastfmActions.setLastfmUsername(values);
  }

  render() {
    return (
      <div>
        <div className="side_left">
          <LastfmUsernameForm
            onSubmit={this.onSubmit}
          />
          <TrackImage/>
          <Link to="/">
          Home
          </Link>
          <Link to="/favorites">
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
  () => ({}),
  dispatch => ({
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(Home);
