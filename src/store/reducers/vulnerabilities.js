import {
  FETCH_VULNERABILITIES_REQUEST,
  FETCH_VULNERABILITIES_SUCCESS,
  FETCH_VULNERABILITIES_ERROR,
} from '../actions/VulnerabilitiesActions';

export const initialStateVulnerabilities = {
  fetching: false,
  error: null,
};

const pkgVulnerabilities = (state = initialStateVulnerabilities, action) => {
  switch (action.type) {
    case FETCH_VULNERABILITIES_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        error: null
      });

    case FETCH_VULNERABILITIES_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
      });

    case FETCH_VULNERABILITIES_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        ...action.response,
      });

    default:
      return state;
  }
};

const vulnerabilities = (state = {}, action) => {
  switch (action.type) {
    case FETCH_VULNERABILITIES_REQUEST:
    case FETCH_VULNERABILITIES_SUCCESS:
    case FETCH_VULNERABILITIES_ERROR:
      const key = `${action.packageName}:${action.version}`;
      return Object.assign({}, state, {
        [key]: pkgVulnerabilities(state[key], action),
      });

    default:
      return state;
  }
};

export default vulnerabilities;
