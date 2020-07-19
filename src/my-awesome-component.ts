import { html, css, property, customElement, LitElement } from 'lit-element';

@customElement('my-awesome-component')
class MyAwesomeComponent extends LitElement {
  _handleClickButton(event: MouseEvent) {
    console.log('Event:', event);
  }

  @property()
  first = '';

  @property()
  last = '';

  render() {
    const { first, last, _handleClickButton: handleClickButton } = this;
    return html`
      Hello,
      <button class="my-awesome-component__foo" @click="${handleClickButton}">
        <slot name="first">${first}</slot>
        <slot name="last">${last}</slot>
      </button>
      !
      <slot></slot>
    `;
  }

  static styles = css`
    :host(my-awesome-component) {
      display: block;
      background-color: cyan;
    }

    :host(my-awesome-component) .my-awesome-component__foo {
      font-weight: 700;
    }
  `;
}

export default MyAwesomeComponent;
