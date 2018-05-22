import fire from '../fire';
import {history} from '../store';

export const GET_PAGES_SUCCEEDED = 'GET_PAGES_SUCCEEDED';

export function getPages() {
  return function (dispatch) {
    fire.database().ref('pages').on('value', snapshot => {
      dispatch({
        type: GET_PAGES_SUCCEEDED,
        payload: snapshot.val()
      })
    })
  }
};

export function createPage(values) {
  return function (dispatch) {
    return fire.database().ref('pages').push(values);
  }
};

export const createPageThenRedirect = (data, path) => (dispatch, getState) =>
  dispatch(createPage(data))
    .then(() => history.push(path));