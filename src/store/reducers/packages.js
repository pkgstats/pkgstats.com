import {
  FETCH_PACKAGE_REQUEST,
  FETCH_PACKAGE_SUCCESS,
  FETCH_PACKAGE_ERROR,
} from '../actions/PackageActions';

export const initialStatePackage = {
  fetching: false,
  error: null,
};

const pkg = (state = initialStatePackage, action) => {
  switch (action.type) {
    case FETCH_PACKAGE_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        error: null,
      });

    case FETCH_PACKAGE_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
      });

    case FETCH_PACKAGE_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        ...action.response,
      });

    default:
      return state;
  }
};

const packages = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PACKAGE_REQUEST:
    case FETCH_PACKAGE_ERROR:
    case FETCH_PACKAGE_SUCCESS:
      return Object.assign({}, state, {
        [action.pkg]: pkg(state[action.pkg], action),
      });

    default:
      return state;
  }
};

export default packages;
