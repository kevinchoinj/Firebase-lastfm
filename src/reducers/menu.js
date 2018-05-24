import {
  TOGGLE_MENU,
  SET_LOADED,
} from '../actions/menu'

const DEFAULT_STATE={
  isHidden:true,
  isLoaded: false,
}

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
    case TOGGLE_MENU:
      return state = {...state, isHidden:payload.isHidden};
    case SET_LOADED:
      return state = {...state, isLoaded:payload.isLoaded};
    default:
      return state;
  }
};
