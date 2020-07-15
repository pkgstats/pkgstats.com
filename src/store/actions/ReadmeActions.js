export const FETCH_README_REQUEST = 'FETCH_README_REQUEST';
export const FETCH_README_SUCCESS = 'FETCH_README_SUCCESS';
export const FETCH_README_ERROR = 'FETCH_README_ERROR';

export const fetchReadme = (pkg) => {
  return async (dispatch, getState) => {
    try {
      const {
        repository,
      } = pkg;

      if (!repository || !repository.url) {
        return;
      }

      if (repository.url.indexOf('github.com') === -1) {
        return;
      }

      const repoRegex = /\w*:\/\/github\.com\/(.*)(\.\w*)?/.exec(repository.url);

      if (!repoRegex) {
        return;
      }

      const readmeInfoResponse = await fetch(`https://api.github.com/repos/${repoRegex[1]}/readme`);
      const readmeInfo = await readmeInfoResponse.json();

      const readmeResponse = await fetch(readmeInfo.download_url);
      const response = await readmeResponse.text();

      dispatch({
        type: FETCH_README_REQUEST,
        pkg,
      });

      dispatch({
        type: FETCH_README_SUCCESS,
        pkg,
        response,
      });
    }
    catch (error) {
      dispatch({
        type: FETCH_README_ERROR,
        pkg,
        error,
      });
    }
  };
};
