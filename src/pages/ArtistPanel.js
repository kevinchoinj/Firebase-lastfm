import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pagesActions from '../actions/pages';
import * as lastfmActions from '../actions/lastfm';
import {history} from '../store';
import CloseButton from '../components/CloseButton';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

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

const ImageDisplay = ({images, artist}) => {
  if (images){
    return(
      <div className="track_image__container">
        <Link
          to={"/artist/"+artist}
        >
          <div
            className="track_image"
            style={{backgroundImage: "url("+images[3]["#text"]+")"}}
          />
        </Link>
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
        <div className="info_container">
          Similar
        </div>
        {similar.artist.map((artist, key)=>
          <div key={key} className="similar_container">
            <ImageDisplay
              images={artist.image}
              artist={artist.name}
            />
            <Link
              to={"/artist/"+artist.name}
              className="track_artist"
            >
              {artist.name}
            </Link>
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
      <div className="track_text">
        <strong>Listeners:</strong> {stats.listeners}
        <br/>
        <strong>Playcount:</strong> {stats.playcount}
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
      <div className="track_text">
        <strong>Tags:&nbsp;</strong>
        {tags.tag.map((tag, key)=>
          <span key={key}>
            {tag.name},&nbsp;
          </span>
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
      isActive,
    } = this.props;

    const panelName = classNames(
      'favorite_panel',
      {
        'favorite_panel--display': isActive
      }
    );

    return artistInfo ?(
      <div className={panelName}>
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
            <div>
              {artistInfo.image?

                <img src={artistInfo.image[3]["#text"]}
                 alt="artist"
                 className="spacing_right"
                />

              :null}

              <div className="track_text">
                <strong>{artistInfo.name}</strong>
              </div>
            </div>

            <div>
              <StatsDisplay
                stats={artistInfo.stats}
              />
              <TagsDisplay
                tags={artistInfo.tags}
              />
            </div>
          </div>

          <div className="info_container">
          <BioDisplay
            bio={artistInfo.bio}
          />
          </div>
          <SimilarDisplay
            similar={artistInfo.similar}
          />
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
