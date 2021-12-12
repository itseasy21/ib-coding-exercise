import { Map } from 'immutable';

import { SESSION_ACTIONS } from '../actions/types';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };


export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SESSION_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case SESSION_ACTIONS.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case SESSION_ACTIONS.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
