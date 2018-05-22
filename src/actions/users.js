import fire from '../fire';
export const GET_FAVORITES_SUCCEEDED = 'GET_FAVORITES_SUCCEEDED';

export function addFavoriteTrack(artist, track, image) {
  const userId = fire.auth().currentUser.uid;
  return function (dispatch) {
    return fire.database().ref(userId).push({artist: artist, track: track, image: image});
  }
};

export function getFavorites() {
  const userId = fire.auth().currentUser.uid;
  return function (dispatch) {
    fire.database().ref(userId).on('value', snapshot => {
      dispatch({
        type: GET_FAVORITES_SUCCEEDED,
        payload: snapshot.val()
      })
    })
  }
};