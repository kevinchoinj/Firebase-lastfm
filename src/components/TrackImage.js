import React from 'react';
import {connect} from 'react-redux';

class TrackImage extends React.Component {
  render() {

    const {
      currentTrack,
    } = this.props;

    return currentTrack ? (
      <div>
        {currentTrack.image[3]?
        <img src={currentTrack.image[3]["#text"]} alt="track"/>
        :null}
      </div>
    )
    :null;
  }
}

export default connect(
  (state, ownProps) => ({
    currentTrack: state.lastfm.currentTrack,
  }),
  dispatch => ({
  }),
)(TrackImage);
