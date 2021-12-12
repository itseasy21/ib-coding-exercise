import { SESSION_ACTIONS } from "./types";

export const setMessage = (message) => ({
  type: SESSION_ACTIONS.SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: SESSION_ACTIONS.CLEAR_MESSAGE,
});