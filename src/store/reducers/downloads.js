import {
  FETCH_DOWNLOADS_REQUEST,
  FETCH_DOWNLOADS_SUCCESS,
  FETCH_DOWNLOADS_ERROR,
} from 'store/actions/DownloadsActions';

export const initialStatePackageDownloads = {
  fetching: false,
  error: null,
};

const packageDownloads = (state = initialStatePackageDownloads, action) => {
  switch (action.type) {
    case FETCH_DOWNLOADS_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        error: null,
      });

    case FETCH_DOWNLOADS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
      });

    case FETCH_DOWNLOADS_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        response: action.response,
      });

    default:
      return state;
  }
};

const downloads = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DOWNLOADS_REQUEST:
    case FETCH_DOWNLOADS_SUCCESS:
    case FETCH_DOWNLOADS_ERROR:
      const downloadsKey = `packages:${action.packages}:type:${action.requestType}:timeframe:${action.timeframe}`;

      return Object.assign({}, state, {
        [downloadsKey]: packageDownloads(state[downloadsKey], action),
      });

    default:
      return state;
  }
};

export default downloads;
