import {
  RECEIVE_TRACK,
  RECEIVE_SIMILAR,
  SET_LASTFM_USERNAME,
  CLEAR_SIMILAR_OF_TRACK,
  RECEIVE_SIMILAR_OF_TRACK,
  SET_SIMILAR_OF_TRACK,
  RECEIVE_TRACK_INFO,
  RECEIVE_ARTIST_INFO,
} from '../actions/lastfm'

const DEFAULT_STATE={
  currentTrack: null,
  currentSimilar: null,
  recentTracks: null,
  lastfmUsername: 'shodyra',
  similarOfTrack: null,
  similarOfBase : null,
  trackInfo: null,
  artistInfo: null,
}

let trackArray = [];

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
    case RECEIVE_TRACK:
      trackArray = [];
      for( let i in payload.payload ) {
        if (payload.payload.hasOwnProperty(i)){
          trackArray.push(payload.payload[i]);
        }
      }
      return {
        ...state,
        currentTrack: trackArray,
      };
    case RECEIVE_SIMILAR:
      trackArray = [];
      for( let i in payload.track ) {
        if (payload.track.hasOwnProperty(i)){
          trackArray.push(payload.track[i]);
        }
      }
      if (trackArray[1]){
        return {
          ...state,
          currentSimilar: payload.similar,
          currentTrack: trackArray[0],
          recentTracks: trackArray.slice(1, trackArray.length),
        };
      }
      else return {
        ...state,
        currentSimilar: payload.similar,
        currentTrack: trackArray[0],
        recentTracks: null,
      }
    case SET_LASTFM_USERNAME:
      return {
        ...state,
        lastfmUsername: payload.values.username,
      };
    case RECEIVE_SIMILAR_OF_TRACK:
      if (payload.data.similartracks){
        return {
          ...state,
          similarOfTrack: payload.data.similartracks.track,
        };
      }
      else return state;
    case CLEAR_SIMILAR_OF_TRACK:
      return {
        ...state,
        similarOfTrack: null,
      };
    case SET_SIMILAR_OF_TRACK:
      return {
        ...state,
        similarOfBase: payload.payload,
      };
    case RECEIVE_TRACK_INFO:
      return {
        ...state,
        trackInfo: payload.payload,
      };
    case RECEIVE_ARTIST_INFO:
      return {
        ...state,
        artistInfo: payload.payload,
      };
   default:
      return state;
  }
};
