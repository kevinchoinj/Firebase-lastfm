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

          payload.payload[i].artist = payload.payload[i].artist.replace("%46", ".");
          payload.payload[i].track = payload.payload[i].track.replace("%46", ".");
          payload.payload[i].image = payload.payload[i].image.replace("%46", ".");

          //favoritesArray.push({[`${payload.payload[i].artist}-${payload.payload[i].track}`]:payload.payload[i]});
          favoritesArray[`${payload.payload[i].artist.replace("%46", ".")}-${payload.payload[i].track.replace("%46", ".")}`]
          =
          payload.payload[i];
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
