import {
  RECEIVE_TRACK,
  RECEIVE_SIMILAR,
  SET_LASTFM_USERNAME,
  CLEAR_SIMILAR_OF_TRACK,
  RECEIVE_SIMILAR_OF_TRACK,
} from '../actions/lastfm'

const DEFAULT_STATE={
  currentTrack: null,
  currentSimilar: null,
  lastfmUsername: 'shodyra',
  similarOfTrack: null,
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
      return {
        ...state,
        currentSimilar: payload.similar,
        currentTrack: trackArray[0],
      };
    case SET_LASTFM_USERNAME:
      return {
        ...state,
        lastfmUsername: payload.values.username,
      };
    case RECEIVE_SIMILAR_OF_TRACK:
      return {
        ...state,
        similarOfTrack: payload.data.similartracks.track,
      };
    case CLEAR_SIMILAR_OF_TRACK:
      return {
        ...state,
        similarOfTrack: null,
      };
   default:
      return state;
  }
};
