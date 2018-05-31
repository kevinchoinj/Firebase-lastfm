import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pagesActions from '../actions/pages';
import * as lastfmActions from '../actions/lastfm';

const BioDisplay = ({bio}) => {
  if (bio){
    return(
      <div>
        Biography
        <br/>
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
        Image
        <br/>
        <img src={images[3]["#text"]}/>
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
        Stats
        <br/>
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


class Register extends React.Component {
  componentDidMount(){
    this.props.pagesActions.setPageName('lastfmArtist');
    this.props.lastfmActions.getArtistInfo({artist:this.props.match.params.artist});
  }
  render() {
    const {
      artistInfo,
    } = this.props;

    return artistInfo ?(
      <div className="side_right">
      artist
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
