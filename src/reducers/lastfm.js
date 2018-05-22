import {
  RECEIVE_TRACK,
  RECEIVE_SIMILAR,
} from '../actions/lastfm'

const DEFAULT_STATE={
  currentTrack: null,
  currentSimilar: null,
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
   default:
      return state;
  }
};
