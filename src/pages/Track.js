import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pagesActions from '../actions/pages';
import * as lastfmActions from '../actions/lastfm';
import lastfmImage from '../media/lastfm.png';

const AlbumDisplay = ({album}) => {
  if (album){
    return(
      <div>
        Album
        <br/>
        {album.title}
        <br/>
        {album.artist}
        <ImageDisplay
          image={album.image}
        />
      </div>
    )
  }
  else {
    return (
    <div className="similar_container">
      No album found
       <img
        src={lastfmImage}
        alt="lastfm"
        className="full_width"
      />
    </div>);
  }
};

const ImageDisplay = ({image}) => {
  if (image){
    return(
      <div>
        Image
        <br/>
        {image[3]["#text"]}
      </div>
    )
  }
  else {
    return (
    <div>
      <img
        src={lastfmImage}
        alt="lastfm"
      />
    </div>);
  }
};

class Register extends React.Component {
  componentDidMount(){
    this.props.pagesActions.setPageName('lastfmArtist');
    this.props.lastfmActions.getTrackInfo({track:this.props.match.params.track, artist:this.props.match.params.artist});
  }
  render() {
    const {
      trackInfo,
    } = this.props;

    return trackInfo ? (
      <div className="side_right">
        <div className="favorite_panel__inner">
        track
          {this.props.match.params.artist}
          <br/>
          {this.props.match.params.track}
          <AlbumDisplay
            album={trackInfo.album}
          />
          listeners: {trackInfo.listeners}
          <br/>
          playcount: {trackInfo.playcount}
        </div>
      </div>
    ):null
  }
}

export default connect(
  (state, ownProps) => ({
    trackInfo: state.lastfm.trackInfo,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(Register);
