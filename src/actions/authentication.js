import fire from '../fire';
import {history} from '../store';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

export const withRequest = ({request}) => request;

export function getCurrentUser() {
  return function (dispatch) {
    fire.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(authUser());
        } else {
          dispatch(signOutUser());
        }
    });
  }
};
export function signUpUser(data) {
  return function(dispatch) {
    return fire.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(response => {
      dispatch(authUser());
    })
    .catch(error => {
      dispatch(authError(error));
    });
  }
};
export const signUpUserThenRedirect = (data, path) => (dispatch, getState) =>
  dispatch(signUpUser(data))
    .then(() => history.push(path));


export function signInUser(data) {
  return function(dispatch) {
    return fire.auth().signInWithEmailAndPassword(data.email, data.password)
    .then(response => {
        dispatch(authUser());
    })
    .catch(error => {
        dispatch(authError(error));
    });
  }
};
export const signInUserThenRedirect = (data, path) => (dispatch, getState) =>
  dispatch(signInUser(data))
    .then(() => history.push(path));

export function signOutUser() {
  return function (dispatch) {
    fire.auth().signOut()
      .then(() =>{
        dispatch({
          type: SIGN_OUT_USER
        })
    });
  }
};

export function authUser() {
  return {
    type: AUTH_USER
  }
};

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
};