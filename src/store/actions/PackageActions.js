import NPMService from '../services/NPMService';

export const FETCH_PACKAGE_REQUEST = 'FETCH_PACKAGE_REQUEST';
export const FETCH_PACKAGE_SUCCESS = 'FETCH_PACKAGE_SUCCESS';
export const FETCH_PACKAGE_ERROR = 'FETCH_PACKAGE_ERROR';

export const fetchPackage = (pkg) => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_PACKAGE_REQUEST,
      pkg,
    });

    return NPMService.getPackage(pkg)
      .then(response => {
        dispatch({
          type: FETCH_PACKAGE_SUCCESS,
          response,
          pkg,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_PACKAGE_ERROR,
          error,
          pkg,
        });
      });
  }
};
