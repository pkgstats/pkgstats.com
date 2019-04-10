export const initialState = {
  authToken: null,
  csrfToken: null,
  error: null,
  fetching: false,
  refreshToken: null,
  user: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default auth;
