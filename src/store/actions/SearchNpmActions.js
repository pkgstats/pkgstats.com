import NPMService from 'store/services/NPMService';

export const SEARCH_NPM_REQUEST = 'SEARCH_NPM_REQUEST';
export const SEARCH_NPM_SUCCESS = 'SEARCH_NPM_SUCCESS';
export const SEARCH_NPM_ERROR = 'SEARCH_NPM_ERROR';

export const searchNpm = (text = '', options = {}) => {
  const requestOptions = Object.assign({}, {
    size: 50,
    skip: 0,
    quality: null,
    popularity: null,
    maintenance: null,
  }, options);

  return (dispatch, getState) => {
    dispatch({
      type: SEARCH_NPM_REQUEST,
      text,
      ...requestOptions,
    });

    return NPMService.search(text, requestOptions)
      .then(response => {
        dispatch({
          type: SEARCH_NPM_SUCCESS,
          response,
          text,
          ...requestOptions,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_NPM_ERROR,
          error,
          text,
          ...requestOptions,
        });
      });
  };
};
