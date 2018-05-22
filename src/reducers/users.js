import {
  GET_FAVORITES_SUCCEEDED,
} from '../actions/users'

const DEFAULT_STATE={
  favorites: null,
}
export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
    case GET_FAVORITES_SUCCEEDED:
      let favoritesArray = [];
      for( let i in payload.payload ) {
        if (payload.payload.hasOwnProperty(i)){
          favoritesArray.push(payload.payload[i]);
        }
      }
      return {
        ...state,
        favorites: favoritesArray,
      };

   default:
      return state;
  }
};
