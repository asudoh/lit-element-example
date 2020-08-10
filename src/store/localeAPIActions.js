const LocaleAPI = {
  getLang() {
    return new Promise(resolve => { setTimeout(() => { resolve({ cc: 'KR', lc: 'ko' }); }, 2000); })
  }
}

export const LOCALE_API_ACTION = {
  SET_REQUEST_LANGUAGE_IN_PROGRESS: 'SET_REQUEST_LANGUAGE_IN_PROGRESS',
  SET_ERROR_REQUEST_LANGUAGE: 'SET_ERROR_REQUEST_LANGUAGE',
  SET_LANGUAGE: 'SET_LANGUAGE',
};

export function setRequestLanguageInProgress(request) {
  return {
    type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
    request,
  };
}

export function setErrorRequestLanguage(error) {
  return {
    type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LANGUAGE,
    error,
  }
}

export function setLanguage(language) {
  return {
    type: LOCALE_API_ACTION.SET_LANGUAGE,
    language,
  }
}

export function loadLanguage() {
  return async (dispatch) => {
    const promiseLanguage = LocaleAPI.getLang().then(({ cc: country, lc: primary }) => `${primary}-${country}`);
    dispatch(setRequestLanguageInProgress(promiseLanguage));
    try {
      dispatch(setLanguage(await promiseLanguage));
    } catch (error) {
      dispatch(setErrorRequestLanguage(error));
      throw error;
    }
    return promiseLanguage;
  }
}