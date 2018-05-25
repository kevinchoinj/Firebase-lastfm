import {
  GET_PAGES_SUCCEEDED,
  TOGGLE_SIMILAR_OF_TRACK,
} from '../actions/pages'

const DEFAULT_STATE={
  pages: null,
  similarOfTrack: false,
}
export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
    case GET_PAGES_SUCCEEDED:
      let pageArray = [];
      for( let i in payload.payload ) {
        if (payload.payload.hasOwnProperty(i)){
          pageArray.push(payload.payload[i]);
        }
      }
      return {
        ...state,
        pages: pageArray,
      };
    case TOGGLE_SIMILAR_OF_TRACK:
      return state = {...state, similarOfTrack: payload.displayed};
   default:
      return state;
  }
};
