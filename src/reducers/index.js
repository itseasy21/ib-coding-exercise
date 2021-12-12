import { combineReducers } from 'redux';
import app from './app';
import session from './session';
import message from './message';

export default combineReducers({
  app,
  session,
  message,
});
