import NPMService from 'store/services/NPMService';

export const FETCH_DOWNLOADS_REQUEST = 'FETCH_DOWNLOADS_REQUEST';
export const FETCH_DOWNLOADS_SUCCESS = 'FETCH_DOWNLOADS_SUCCESS';
export const FETCH_DOWNLOADS_ERROR = 'FETCH_DOWNLOADS_ERROR';

export const fetchDownloads = (packages, requestType = 'range', timeframe = 'last-month') => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_DOWNLOADS_REQUEST,
      requestType,
      timeframe,
      packages,
    });

    return NPMService.getDownloads(packages, requestType, timeframe)
      .then(response => {
        dispatch({
          type: FETCH_DOWNLOADS_SUCCESS,
          response,
          packages,
          requestType,
          timeframe,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_DOWNLOADS_ERROR,
          error,
          packages,
          requestType,
          timeframe,
        });
      });
  };
};
