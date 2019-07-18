import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import ApiService from './services/ApiService';
import NPMService from './services/NPMService';
import defaultReducers from './reducers';
import { initialState as initialStateAuth } from './reducers/auth';
import { initialState as initialStatePackages } from './reducers/packages';
import { initialState as initialStateUsers } from './reducers/users';

const env = process.env.NODE_ENV || 'development';

let store;

export default function configureStore(initialState = {}, {
  middleware = [],
  reducers = {},
}) {
  middleware = [
    ...middleware,
    thunk,
  ];

  if (env === 'development') {
    middleware = [
      ...middleware,
      logger,
    ];
  }

  const enhancer = compose(
    applyMiddleware(...middleware)
  );

  let state = Object.assign({}, initialState);

  const initialStates = {
    auth: initialStateAuth,
    packages: initialStatePackages,
    users: initialStateUsers,
  };

  /**
   * Structure initial states
   */
  [
    'auth',
    'packages',
    'users',
  ].forEach(item => {
    if (initialState.hasOwnProperty(item)) {
      state = Object.assign({}, state, {
        [item]: Object.assign({}, initialStates[item], initialState[item]),
      });
    }
  });

  store = createStore(combineReducers({
    ...defaultReducers,
    ...reducers,
  }), state, enhancer);

  ApiService.store = store;

  if (typeof window !== 'undefined') {
    const {
      origin,
    } = window.location;

    NPMService.origin = `${origin}/api/npm`;
  }

  return store;
}
