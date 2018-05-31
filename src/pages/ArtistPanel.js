import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pagesActions from '../actions/pages';
import * as lastfmActions from '../actions/lastfm';
import {history} from '../store';
import CloseButton from '../components/CloseButton';
import FontAwesome from 'react-fontawesome';

const BioDisplay = ({bio}) => {
  if (bio){
    return(
      <div>
        {bio.content}
      </div>
    )
  }
  else {
    return (<div></div>);
  }
};

const ImageDisplay = ({images}) => {
  if (images){
    return(
      <div>
        <img
          src={images[3]["#text"]}
          alt="artist"
        />
        {/*images.map((image, key)=>
          <div key={key}>
            <img
              src={image["#text"]}
              alt="artist image"
            />
          </div>
        )*/}
      </div>
    )
  }
  else {
    return (
      <div>
      </div>
    );
  }
};

const SimilarDisplay = ({similar}) => {
  if (similar.artist){
    return(
      <div>
        Similar Artists
        <br/>
        {similar.artist.map((artist, key)=>
          <div key={key}>
            {artist.name}
            <ImageDisplay
              images={artist.image}
            />
          </div>
        )}
      </div>
    )
  }
  else {
    return (<div></div>);
  }
};

const StatsDisplay = ({stats}) => {
  if (stats){
    return(
      <div>
        Listeners: {stats.listeners}
        <br/>
        Playcount: {stats.playcount}
      </div>
    )
  }
  else {
    return (<div></div>);
  }
};

const TagsDisplay = ({tags}) => {
  if (tags.tag){
    return(
      <div>
        Tags
        <br/>
        {tags.tag.map((tag, key)=>
          <div key={key}>
            {tag.name}
          </div>
        )}
      </div>
    )
  }
  else {
    return (<div></div>);
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

class Register extends React.Component {
  returnHome = () => {
    history.push("/");
  }
  render() {
    const {
      artistInfo,
    } = this.props;


    return artistInfo ?(
      <div className="side_right">
        <WatermarkDisplay
          artistInfo={artistInfo}
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
        <div className="side_right__inner">
          <div className="info_container">
            {artistInfo.name}
            <ImageDisplay
              images={artistInfo.image}
            />
            <StatsDisplay
              stats={artistInfo.stats}
            />
            <TagsDisplay
              tags={artistInfo.tags}
            />
            <BioDisplay
              bio={artistInfo.bio}
            />
            <SimilarDisplay
              similar={artistInfo.similar}
            />
          </div>
        </div>
      </div>
    ):null
  }
}

export default connect(
  (state, ownProps) => ({
    artistInfo: state.lastfm.artistInfo,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
    lastfmActions: bindActionCreators(lastfmActions, dispatch),
  }),
)(Register);
