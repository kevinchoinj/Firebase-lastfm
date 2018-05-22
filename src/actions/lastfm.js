let json = require('../config.json');
let apiKey= json.loginid;

export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_SIMILAR = 'RECEIVE_SIMILAR';

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
	ourRequest.open('Get', "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+values.username+"&api_key="+apiKey+"&limit=1&format=json")
	ourRequest.onload = function(){
		if (ourRequest.status >= 200 && ourRequest.status < 400){
			let parsed = JSON.parse(ourRequest.responseText);
      dispatch(requestSimilar(parsed));
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
    "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&limit=6&artist="
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
      dispatch(receiveSimilar(values, parsed));
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

export function receiveTrack(data) {
  return {
    type: RECEIVE_TRACK,
    payload: data.recenttracks.track
  }
}

export function receiveSimilar(track, similar) {
  return {
    type: RECEIVE_SIMILAR,
    track: track.recenttracks.track,
    similar: similar.similartracks.track,
  }
}