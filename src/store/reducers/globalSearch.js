import {
  GLOBAL_SEARCH_INPUT,
  GLOBAL_SEARCH_CLEAR,
} from 'store/actions/GlobalSearchActions';


const globalSearch = (state = {text: ''}, action) => {
  switch (action.type) {
    case GLOBAL_SEARCH_INPUT:
    case GLOBAL_SEARCH_CLEAR:
      return Object.assign({}, state, {
        text: action.text,
      });

    default:
      return state;
  }
}

export default globalSearch;
