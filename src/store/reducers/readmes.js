import {
  FETCH_README_REQUEST,
  FETCH_README_SUCCESS,
  FETCH_README_ERROR,
} from '../actions/ReadmeActions';

export const initialStateReadme = {
  fetching: false,
  error: null,
};

const readme = (state = initialStateReadme, action) => {
  switch (action.type) {
    case FETCH_README_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        error: null,
      });

    case FETCH_README_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
      });

    case FETCH_README_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        response: action.response,
      });

    default:
      return state;
  }
};

const readmes = (state = {}, action) => {
  switch (action.type) {
    case FETCH_README_REQUEST:
    case FETCH_README_SUCCESS:
    case FETCH_README_ERROR:
      return Object.assign({}, state, {
        [action.pkg.name]: readme(state[action.pkg.name], action),
      });

    default:
      return state;
  }
};

export default readmes;
