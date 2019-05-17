import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ERROR,
} from '../actions/UserActions';

export const initialState = {
  fetching: false,
  error: null,
  items: {},
};

const user = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        ...action.response,
      });

    default:
      return state;
  }
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        error: null,
      });

    case FETCH_USER_PROFILE_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
      });

    case FETCH_USER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        items: Object.assign({}, state.items, {
          [action.username]: user(state.items[action.username], action),
        }),
      });

    default:
      return state;
  }
};

export default users;
