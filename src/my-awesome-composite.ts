import { html, property, customElement, LitElement } from 'lit-element';

@customElement('my-awesome-composite')
class MyAwesomeComposite extends LitElement {
  private _loadLanguage?: () => Promise<string>;

  @property({ attribute: false })
  errorRequestLanguage?: Error;

  @property()
  requestLanguageInProgress = false;

  @property()
  language = '';

  firstUpdated() {
    this._loadLanguage?.();
  }

  render() {
    const { requestLanguageInProgress, errorRequestLanguage, language } = this;
    return html`
      ${!requestLanguageInProgress ? undefined : html`<div>Request language is in progress...</div>`}
      <div>Language: ${language}</div>
      <div>Error in requesting language: ${errorRequestLanguage?.message}</div>
    `;
  }
}

export default MyAwesomeComposite;
