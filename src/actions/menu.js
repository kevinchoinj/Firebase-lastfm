export const TOGGLE_MENU = Symbol('TOGGLE_MENU');
export const SET_LOADED = Symbol('SET_LOADED');

export const toggleMenu = (isHidden) =>{
    return{
      type: TOGGLE_MENU,
      isHidden
    };
}

export const setLoaded = (isLoaded) =>{
  return{
    type: SET_LOADED,
    isLoaded
  };
}

