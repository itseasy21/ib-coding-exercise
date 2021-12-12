// export { default as app } from './app';
// export { default as session } from './session';
// export { default as message } from './message';

import { combineReducers } from "redux";
import app from "./app";
import session from "./session"
import message from "./message";

export default combineReducers({
  app,
  session,
  message,
});