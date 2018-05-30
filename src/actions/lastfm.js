let json = require('../config.json');
let apiKey= json.loginid;

export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_SIMILAR = 'RECEIVE_SIMILAR';
export const SET_LASTFM_USERNAME = 'SET_LASTFM_USERNAME';
export const CLEAR_SIMILAR_OF_TRACK = 'CLEAR_SIMILAR_OF_TRACK';
export const RECEIVE_SIMILAR_OF_TRACK = 'RECEIVE_SIMILAR_OF_TRACK';
export const SET_SIMILAR_OF_TRACK = 'SET_SIMILAR_OF_TRACK';

export const getCurrentTrack = (values) => (dispatch, getState) =>
  dispatch(requestTrack(values))
export const getCurrentSimilar = (values) => (dispatch, getState) =>
  dispatch(requestTrackThenRequestSimilar(values))

const  requestTrack = (values) => (dispatch, getState) => {
  let ourRequest = new XMLHttpRequest();
	ourRequest.open('Get', "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+values.username+"&api_key="+apiKey+"&limit=1&format=json")
	ourRequest.onload = function(){
		if (ourRequest.status >= 200 && ourRequest.status < 400){
			let parsed = JSON.parse(ourRequest.responseText);
      dispatch(receiveTrack(parsed));
		}
		else{
      console.log("connected to server, but returned error.");
		}
	};
	ourRequest.onerror = function(){
    console.log("Connection error");
	}
	return ourRequest.send();
}

const  requestTrackThenRequestSimilar = (values) => (dispatch, getState) => {
  let ourRequest = new XMLHttpRequest();
  ourRequest.open('Get', "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="
    +
    values.username
    +
    "&api_key="
    +apiKey
    +
    "&limit=5&format=json")
	ourRequest.onload = function(){
		if (ourRequest.status >= 200 && ourRequest.status < 400){
      let parsed = JSON.parse(ourRequest.responseText);
      if (parsed.recenttracks){
        if (getState().lastfm.currentTrack && parsed.recenttracks.track){
          if (
            (getState().lastfm.currentTrack.name !== parsed.recenttracks.track["0"].name)
            &&
            (getState().lastfm.currentTrack.artist["#text"] !== parsed.recenttracks.track["0"].artist["#text"])
          ){
            dispatch(requestSimilar(parsed));
          }
        }
        else {
          dispatch(requestSimilar(parsed));
        }
      }
		}
		else{
      console.log("connected to server, but returned error.");
		}
	};
	ourRequest.onerror = function(){
    console.log("Connection error");
	}
	return ourRequest.send();
}

const requestSimilar = (values) => (dispatch, getState) => {
  let ourRequest = new XMLHttpRequest();
  ourRequest.open('Get',
    "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&limit=24&artist="
    +
    values.recenttracks.track["0"].artist["#text"]
    +
    "&track="
    +
    values.recenttracks.track["0"].name
    +
    "&api_key="+apiKey+"&format=json");
	  ourRequest.onload = function(){
		if (ourRequest.status >= 200 && ourRequest.status < 400){
      let parsed = JSON.parse(ourRequest.responseText);
      if (parsed) {
        dispatch(receiveSimilar(values, parsed));
      }
      else {
        dispatch(receiveTrack(values));
      }
		}
		else{
      console.log("connected to server, but returned error.");
		}
	};
	ourRequest.onerror = function(){
    console.log("Connection error");
	}
	return ourRequest.send();
}

export const requestSimilarOfTrack = (values) => (dispatch, getState) => {
  let ourRequest = new XMLHttpRequest();
  ourRequest.open('Get',
    "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&limit=24&artist="
    +
    values.artist
    +
    "&track="
    +
    values.track
    +
    "&api_key="+apiKey+"&format=json");
	  ourRequest.onload = function(){
		if (ourRequest.status >= 200 && ourRequest.status < 400){
      let parsed = JSON.parse(ourRequest.responseText);
      if (parsed) {
        dispatch(receiveSimilarOfTrack(parsed));
      }
      else {

      }
		}
		else{
      console.log("connected to server, but returned error.");
		}
	};
	ourRequest.onerror = function(){
    console.log("Connection error");
	}
	return ourRequest.send();
}

export function setSimilarOfTrack(data){
  return {
    type: SET_SIMILAR_OF_TRACK,
    payload: data,
  }
}

export function receiveTrack(data) {
  return {
    type: RECEIVE_TRACK,
    payload: data.recenttracks.track
  }
}

export function receiveSimilar(track, similar) {
  if (similar.similartracks){
    return {
      type: RECEIVE_SIMILAR,
      track: track.recenttracks.track,
      similar: similar.similartracks.track,
    }
  }
  else return{
    type: RECEIVE_SIMILAR,
    track: track.recenttracks.track,
  }
}
export function clearSimilarOfTrack(){
  return {
    type: CLEAR_SIMILAR_OF_TRACK,
  }
}
export function receiveSimilarOfTrack(data) {
  return {
    type: RECEIVE_SIMILAR_OF_TRACK,
    data: data,
  }
}

export function setLastfmUsername(values) {
  return {
    type: SET_LASTFM_USERNAME,
    values: values,
  }
}