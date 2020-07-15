import SnykService from '../services/SnykService';

export const FETCH_VULNERABILITIES_REQUEST = 'FETCH_VULNERABILITIES_REQUEST';
export const FETCH_VULNERABILITIES_SUCCESS = 'FETCH_VULNERABILITIES_SUCCESS';
export const FETCH_VULNERABILITIES_ERROR = 'FETCH_VULNERABILITIES_ERROR';

export const fetchVulnerabilities = (packageName, version) => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_VULNERABILITIES_REQUEST,
      packageName,
      version
    });

    return SnykService.getVulnerabilities(packageName, version)
      .then(response => {
        dispatch({
          type: FETCH_VULNERABILITIES_SUCCESS,
          response,
          packageName,
          version,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_VULNERABILITIES_ERROR,
          error,
          packageName,
          version
        });
      });
  }
}
