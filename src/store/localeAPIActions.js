const LocaleAPI = {
  async getLang() {
    return { cc: 'KR', lc: 'ko' };
  }
}

export const LOCALE_API_ACTION = {
  SET_LANGUAGE: 'SET_LANGUAGE',
};

export function setLanguage(language) {
  return {
    type: LOCALE_API_ACTION.SET_LANGUAGE,
    language,
  }
}

export function loadLanguage() {
  return async (dispatch) => {
    const promiseLanguage = LocaleAPI.getLang().then(({ cc: country, lc: primary }) => `${primary}-${country}`);
    dispatch(setLanguage(await promiseLanguage));
    return promiseLanguage;
  }
}