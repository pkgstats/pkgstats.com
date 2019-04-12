import NPMService from '../services/NPMService';

export const FETCH_USER_PACKAGES_REQUEST = 'FETCH_USER_PACKAGES_REQUEST';
export const FETCH_USER_PACKAGES_SUCCESS = 'FETCH_USER_PACKAGES_SUCCESS';
export const FETCH_USER_PACKAGES_ERROR = 'FETCH_USER_PACKAGES_ERROR';

export const SEARCH_PACKAGES_REQUEST = 'SEARCH_PACKAGES_REQUEST';
export const SEARCH_PACKAGES_SUCCESS = 'SEARCH_PACKAGES_SUCCESS';
export const SEARCH_PACKAGES_ERROR = 'SEARCH_PACKAGES_ERROR';


export const fetchUserPackages = (username) => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_USER_PACKAGES_REQUEST,
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

export const searchPackages = (text = '', {size = 50, skip = 0, quality = null, popularity = null, maintenance = null} = {}) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEARCH_PACKAGES_REQUEST,
      text,
      size,
      skip,
      quality,
      popularity,
      maintenance,
    });

    return NPMService.search(text, {
      size,
      skip,
      quality,
      popularity,
      maintenance,
    })
      .then(response => {
        dispatch({
          type: SEARCH_PACKAGES_SUCCESS,
          response,
          text,
          size,
          skip,
          quality,
          popularity,
          maintenance,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_PACKAGES_ERROR,
          error,
          text,
          size,
          skip,
          quality,
          popularity,
          maintenance,
        });
      });
  };
};
