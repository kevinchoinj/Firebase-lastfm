import React from 'react';
import {connect} from 'react-redux';
import CloseButton from '../components/CloseButton';
import SimilarImage from '../components/SimilarImage';
import classNames from 'classnames';
import {history} from '../store';
import FontAwesome from 'react-fontawesome';

const WatermarkDisplay = ({
  trackInfo
  }) => {
  if (trackInfo){
    if (trackInfo.image){
      return (
        <div
          className="watermark_background"
          style={{backgroundImage:"url("+trackInfo.image[3]["#text"]+")"}}
        />
      )
    }
  }
  else {
    return null;
  }
};

class SimilarPanel extends React.Component {
  onSubmit = values => {
    this.props.authActions.signUpUserThenRedirect(values, '/');
  }
  returnHome = () => {
    history.push("/");
  }
  render() {
    const {
      isActive,
      currentTrack,
    } = this.props;

    const panelName = classNames(
      'favorite_panel',
      {
        'favorite_panel--display': isActive,
      }
    );

    return currentTrack ? (
      <div className={panelName}>
        <WatermarkDisplay
          trackInfo={currentTrack}
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
        <SimilarImage />
      </div>
    ):null
  }
}

export default connect(
  (state, ownProps) => ({
    currentTrack: state.lastfm.currentTrack,
  }),
  dispatch => ({
  }),
)(SimilarPanel);
