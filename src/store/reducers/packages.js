import {
  FETCH_USER_PACKAGES_REQUEST,
  FETCH_USER_PACKAGES_SUCCESS,
  FETCH_USER_PACKAGES_ERROR,
} from '../actions/PackageActions';

export const initialState = {
  fetching: false,
  error: null,
  items: [],
};

const pkg = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const packages = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PACKAGES_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        error: null,
      });

    case FETCH_USER_PACKAGES_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
      });

    case FETCH_USER_PACKAGES_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        items: [
          ...state.items,
          ...action.response.objects,
        ],
      });

    default:
      return state;
  }
};

export default packages;
