interface LocaleAPIState {
  language?: string;
  requestLanguage?: Promise<string>;
  requestLanguageInProgress?: boolean;
  errorRequestLanguage?: Error;
}

export default LocaleAPIState;
