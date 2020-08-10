import { ThunkAction } from 'redux-thunk';
import LocaleAPIState from './localeAPIState';

const LocaleAPI = {
  getLang() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ cc: "KR", lc: "ko" });
      }, 2000);
    });
  },
};

export enum LOCALE_API_ACTION {
  SET_REQUEST_LANGUAGE_IN_PROGRESS = "SET_REQUEST_LANGUAGE_IN_PROGRESS",
  SET_ERROR_REQUEST_LANGUAGE = "SET_ERROR_REQUEST_LANGUAGE",
  SET_LANGUAGE = "SET_LANGUAGE",
}

export function setRequestLanguageInProgress(request: Promise<string>) {
  return {
    type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
    request,
  };
}

export function setErrorRequestLanguage(error: Error) {
  return {
    type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LANGUAGE,
    error,
  };
}

export function setLanguage(language: string) {
  return {
    type: LOCALE_API_ACTION.SET_LANGUAGE,
    language,
  };
}

export type LocaleAPIActions =
  | ReturnType<typeof setRequestLanguageInProgress>
  | ReturnType<typeof setErrorRequestLanguage>
  | ReturnType<typeof setLanguage>;

export function loadLanguage(): ThunkAction<Promise<string>, { localeAPI: LocaleAPIState }, void, LocaleAPIActions> {
  return async (dispatch) => {
    const promiseLanguage = (LocaleAPI.getLang() as Promise<{
      cc: string;
      lc: string;
    }>).then(({ cc: country, lc: primary }) => `${primary}-${country}`);
    dispatch(setRequestLanguageInProgress(promiseLanguage));
    try {
      dispatch(setLanguage(await promiseLanguage));
    } catch (error) {
      dispatch(setErrorRequestLanguage(error));
      throw error;
    }
    return promiseLanguage;
  };
}
