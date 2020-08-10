import { html, property, customElement, LitElement } from 'lit-element';

@customElement('my-awesome-composite')
class MyAwesomeComposite extends LitElement {
  @property()
  language = '';

  firstUpdated() {
    this._loadLanguage?.();
  }

  render() {
    const { language } = this;
    return html`
      <div>Language: ${language}</div>
    `;
  }
}

export default MyAwesomeComposite;
