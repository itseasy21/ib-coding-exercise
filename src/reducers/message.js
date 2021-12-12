import { SESSION_ACTIONS } from '../actions/types';

const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SESSION_ACTIONS.SET_MESSAGE:
      return { message: payload };

    case SESSION_ACTIONS.CLEAR_MESSAGE:
      return { message: '' };

    default:
      return state;
  }
}
