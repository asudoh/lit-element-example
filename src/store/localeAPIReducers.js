import { combineReducers } from 'redux';
import { LOCALE_API_ACTION } from './localeAPIActions';

function localeAPIReducer(state = {}, action) {
  switch (action.type) {
    case LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS: {
      const { request: requestLanguage } = action;
      return {
        ...state,
        requestLanguageInProgress: true,
        requestLanguage,
      };
    }
    case LOCALE_API_ACTION.SET_ERROR_REQUEST_LANGUAGE: {
      const { error: errorRequestLanguage } = action;
      return {
        ...state,
        requestLanguageInProgress: false,
        requestLanguage: Promise.reject(errorRequestLanguage),
        errorRequestLanguage,
      };
    }
    case LOCALE_API_ACTION.SET_LANGUAGE: {
      const { language } = action;
      return {
        ...state,
        requestLanguage: Promise.resolve(language),
        requestLanguageInProgress: false,
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
