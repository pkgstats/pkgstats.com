import NPMService from '../services/NPMService';

export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_ERROR = 'FETCH_USER_PROFILE_ERROR';

export const fetchUser = (username) => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_USER_PROFILE_REQUEST,
      username,
    });

    NPMService.getUser(username)
      .then(response => {
        dispatch({
          type: FETCH_USER_PROFILE_SUCCESS,
          respones,
          username,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_USER_PROFILE_ERROR,
          error,
          username,
        });
      });
  };
};
