import NPMService from '../services/NPMService';

export const FETCH_USER_PACKAGES_REQUEST = 'FETCH_USER_PACKAGES_REQUEST';
export const FETCH_USER_PACKAGES_SUCCESS = 'FETCH_USER_PACKAGES_SUCCESS';
export const FETCH_USER_PACKAGES_ERROR = 'FETCH_USER_PACKAGES_ERROR';

export const fetchUserPackages = (username) => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_USER_PACKAGES_REQUEST ,
      username,
    });

    return NPMService.getUserPackages(username)
      .then(response => {
        dispatch({
          type: FETCH_USER_PACKAGES_SUCCESS,
          response,
          username,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_USER_PACKAGES_ERROR,
          error,
          username,
        });
      });
  };
};
