import { csrfFetch } from "./csrf";

const LOAD_USER = "/users/LOAD_USER";
const LOAD_CURRENT_USER = "/users/LOAD_CURRENT_USER";


const loadUser = (user) => {
  return {
    type: LOAD_USER,
    user,
  };
};

const loadCurrentUser = (user) => {
  return {
    type: LOAD_CURRENT_USER,
    user,
  };
};

export const getUser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);
  if (res.ok) {
    const user = await res.json();
    dispatch(loadUser(user));
    return user;
  }
};

export const getCurrentUser = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users/profile`);
  if (res.ok) {
    const user = await res.json();
    dispatch(loadCurrentUser(user));
    return user;
  }
};



let initialState = {
  singleUser: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      const userState = { ...state, singleUser: { ...action.user } };
      return userState;
    case LOAD_CURRENT_USER:
      const currentUserState = { ...state, singleUser: { ...action.user } };
      return currentUserState;
    default:
      return state;
  }
};
