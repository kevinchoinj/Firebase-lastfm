import {
  RECEIVE_TRACK,
  RECEIVE_SIMILAR,
  SET_LASTFM_USERNAME,
} from '../actions/lastfm'

const DEFAULT_STATE={
  currentTrack: null,
  currentSimilar: null,
  lastfmUsername: 'shodyra',
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
    console.log(payload);
      return {
        ...state,
        lastfmUsername: payload.values.username,
      };
   default:
      return state;
  }
};
