import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import {history} from 'store';

import * as pagesActions from 'actions/pages';
import * as lastfmActions from 'actions/lastfm';

import CloseButton from 'components/CloseButton';

const BioDisplay = ({bio, createMarkup}) => {
  if (bio){
    return(
      <div className="bio_text">
        <div dangerouslySetInnerHTML={createMarkup(bio.content)} />
      </div>
    )
  }
  else {
    return null;
  }
};

const ImageDisplay = ({images, artist}) => {
  if (images){
    return(
      <div className="track_image__container">
        <Link to={"/artist/"+artist}>
        <img src={images[3]["#text"]} className="track_image" alt="track"/>
        </Link>
      </div>
    )
  }
  else {
    return null;
  }
};

const SimilarDisplay = ({similar}) => {
  if (similar.artist){
    return(
      <div>
        <div className="info_container artist_title">
          <strong>Similar</strong>
        </div>
        <div className="artist_grid">
          {similar.artist.map((artist, key)=>
            <div key={key} className="similar_container">
              <div className="track_image__container">
                <ImageDisplay
                  images={artist.image}
                  artist={artist.name}
                />
                <div className="track_image__overlay"/>
                <div className="track_image__text">
                  <div className="track_image__text_artist">
                    <Link to={"/artist/"+artist.name}>
                      {artist.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  else {
    return null;
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
    return null;
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
    return null;
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
  createMarkup = (bioText) => {
    return {__html: bioText};
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

              <div className="artist_title">
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
            createMarkup={this.createMarkup}
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
