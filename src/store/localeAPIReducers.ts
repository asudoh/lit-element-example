import { combineReducers } from "redux";
import {
  LOCALE_API_ACTION,
  LocaleAPIActions,
  setRequestLanguageInProgress,
  setErrorRequestLanguage,
  setLanguage,
} from "./localeAPIActions";
import LocalAPIState from "./localeAPIState";

function localeAPIReducer(
  state: LocalAPIState = {},
  action: LocaleAPIActions
): LocalAPIState {
  switch (action.type) {
    case LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS: {
      const { request: requestLanguage } = action as ReturnType<
        typeof setRequestLanguageInProgress
      >;
      return {
        ...state,
        requestLanguageInProgress: true,
        requestLanguage,
      };
    }
    case LOCALE_API_ACTION.SET_ERROR_REQUEST_LANGUAGE: {
      const { error: errorRequestLanguage } = action as ReturnType<
        typeof setErrorRequestLanguage
      >;
      return {
        ...state,
        requestLanguageInProgress: false,
        requestLanguage: Promise.reject(errorRequestLanguage),
        errorRequestLanguage,
      };
    }
    case LOCALE_API_ACTION.SET_LANGUAGE: {
      const { language } = action as ReturnType<typeof setLanguage>;
      return {
        ...state,
        requestLanguage: Promise.resolve(language),
        requestLanguageInProgress: false,
        language,
      };
    }
    default:
      return state;
  }
}

const reducers = combineReducers({
  localeAPI: localeAPIReducer,
});

export default reducers;
