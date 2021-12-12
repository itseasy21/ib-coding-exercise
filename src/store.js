import { connectRouter } from 'connected-react-router/immutable';

import { combineReducers } from 'redux-immutable';

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import * as allReducers from "./reducers";

export default function configureStore(history) {
  const middleware = [thunk];

  const rootReducer = combineReducers({
        router: connectRouter(history),
        ...allReducers
      });

  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};