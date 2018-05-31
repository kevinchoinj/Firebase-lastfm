import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CloseButton from '../components/CloseButton';
import * as pagesActions from '../actions/pages';
import * as lastfmActions from '../actions/lastfm';
import lastfmImage from '../media/lastfm.png';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import {history} from '../store';

const AlbumTextDisplay = ({album, track}) => {
  if (track.artist){
    return(
      <div className="similar_container">
        <div>
          <Link
            to={"/track/"+track.artist.name+"/"+track.name}
            className="track_name"
          >
            {track.name}
          </Link>
        </div>
        <div>
          <Link
            to={"/artist/"+track.artist.name}
            className="track_artist"
          >
            {track.artist.name}
          </Link>
        </div>
        <div className="track_text">
          {album.title}
        </div>
      </div>
    )
  }
  else {
    return null;
  }
};
const AlbumDisplay = ({album, track}) => {
  if (album){
    return(
      <div className="similar_base__container">
        <div className="similar_container">
          <img
            src={album.image[3]["#text"]}
            alt="similar"
            className="full_width"
          />
        </div>
        <AlbumTextDisplay
          album={album}
          track={track}
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

class Track extends React.Component {
  componentDidMount(){
    this.props.pagesActions.setPageName('lastfmTrack');
    this.props.lastfmActions.getTrackInfo({track:this.props.match.params.track, artist:this.props.match.params.artist});
  }
  returnHome = () => {
    history.push("/");
  }
  render() {
    const {
      trackInfo,
    } = this.props;

    return trackInfo ? (
      <div className="side_right">
        <CloseButton
          toggleAction= {this.returnHome}
        />
        <div
          className="back_button"
          onClick={()=>history.goBack()}
        >
          <FontAwesome name="arrow-circle-left"/>
        </div>
      <div className="side_right__inner">
        <AlbumDisplay
          album={trackInfo.album}
          track={trackInfo}
        />
        <div className="info_container">
          listeners: {trackInfo.listeners}
          <br/>
          playcount: {trackInfo.playcount}
        </div>
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
)(Track);
