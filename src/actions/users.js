import fire from '../fire';
import {history} from '../store';
export const GET_FAVORITES_SUCCEEDED = 'GET_FAVORITES_SUCCEEDED';

export function addFavoriteTrack(artist, track, image) {
  const userId = fire.auth().currentUser.uid;
  return function (dispatch) {
    return fire.database().ref(userId).update({[`${artist}-${track}`]: {artist: artist, track: track, image: image}});
  }
};
export const addFavoriteTrackThenRedirect = (artist, track, image, path) => (dispatch, getState) =>
  dispatch(addFavoriteTrack(artist,track,image))
    .then(() => history.push(path));

export function removeFavoriteTrack(artist, track) {
  const userId = fire.auth().currentUser.uid;
  return dispatch => fire.database().ref(userId).child(`${artist}-${track}`).remove();
}
export const removeFavoriteTrackThenRedirect = (artist, track, path) => (dispatch, getState) =>
  dispatch(removeFavoriteTrack(artist, track))
    .then(() => history.push(path));

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