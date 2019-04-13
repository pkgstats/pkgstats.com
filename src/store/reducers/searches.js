import {
  SEARCH_NPM_REQUEST,
  SEARCH_NPM_SUCCESS,
  SEARCH_NPM_ERROR,
} from 'store/actions/SearchNpmActions';

export const initialStateSearch = {
  fetching: false,
  error: null,
  objects: [],
  total: null,
  time: null,
};

const buildSearchKey = (action) => {
  return Object.keys(action).sort((a, b) => {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  })
  .filter(key => ['text', 'maintenance', 'popularity', 'quality'].includes(key))
  .filter(key => action[key] !== null)
  .map(key => `${key}:${action[key]}`)
  .join('-');
}

const search = (state = initialStateSearch, action) => {
  switch (action.type) {
    case SEARCH_NPM_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        error: null,
      });

    case SEARCH_NPM_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
      });

    case SEARCH_NPM_SUCCESS:
      const {
        objects,
        total,
        time,
      } = action.response;

      return Object.assign({}, state, {
        fetching: false,
        objects: [
          ...state.objects,
          ...objects,
        ],
        total,
        time,
      });

    default:
      return state;
  }
};

const searches = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_NPM_REQUEST:
    case SEARCH_NPM_ERROR:
    case SEARCH_NPM_SUCCESS:
      const searchKey = buildSearchKey(action);
      return Object.assign({}, state, {
        [searchKey]: search(state[searchKey], action),
      });

    default:
      return state;
  }
};



export default searches;
