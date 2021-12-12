import { createAction } from 'redux-actions';

import { SESSION_ACTIONS } from './types';
import SessionService from "../services/session.service";

export const login = (username, password) => (dispatch) => {
    return SessionService.login(username, password).then(
      (data) => {
        dispatch({
          type: SESSION_ACTIONS.LOGIN_SUCCESS,
          payload: { user: data },
        });

        dispatch({
          type: SESSION_ACTIONS.SET_MESSAGE,
          payload: "Login Success!",
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: SESSION_ACTIONS.LOGIN_FAIL,
        });
  
        dispatch({
          type: SESSION_ACTIONS.SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    SessionService.logout();
  
    dispatch({
      type: SESSION_ACTIONS.LOGOUT,
    });
  };

export const setUserDetails = createAction(SESSION_ACTIONS.SET_USER_DETAILS);
