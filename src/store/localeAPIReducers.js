import { combineReducers } from 'redux';
import { LOCALE_API_ACTION } from './localeAPIActions';

function localeAPIReducer(state = {}, action) {
  switch (action.type) {
    case LOCALE_API_ACTION.SET_LANGUAGE: {
      const { language } = action;
      return {
        ...state,
        language,
      }
    }
    default:
      return state;
  }
}

const reducers = combineReducers({
  localeAPI: localeAPIReducer,
});

export default reducers;
