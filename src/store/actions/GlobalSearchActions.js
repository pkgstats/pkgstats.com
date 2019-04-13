export const GLOBAL_SEARCH_INPUT = 'GLOBAL_SEARCH_INPUT';
export const GLOBAL_SEARCH_CLEAR = 'GLOBAL_SEARCH_CLEAR';

export const globalSearchInput = (text) => {
  return {
    type: GLOBAL_SEARCH_INPUT,
    text,
  };
};

export const globalSearchClear = () => {
  return {
    type: GLOBAL_SEARCH_CLEAR,
    text: '',
  };
};
