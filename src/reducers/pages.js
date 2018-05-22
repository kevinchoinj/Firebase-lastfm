import {
  GET_PAGES_SUCCEEDED,
} from '../actions/pages'

const DEFAULT_STATE={
  pages: null,
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
   default:
      return state;
  }
};
