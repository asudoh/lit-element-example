import { html, css, property, customElement, LitElement } from 'lit-element';

@customElement('my-awesome-component-with-counter')
class MyAwesomeComponent extends LitElement {
  _handleClickButton() {
    const { eventBeforeIncrement, eventIncrement } = this.constructor as typeof MyAwesomeComponent;
    const newCounter = this.counter + 1;
    const descriptor = { bubbles: true, cancelable: true, composed: true, detail: { value: newCounter } };
    if (this.dispatchEvent(new CustomEvent(eventBeforeIncrement, descriptor))) {
      this.counter++;
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent(eventIncrement, descriptor));
    }
  }

  @property({ type: Number })
  base = 0;

  @property({ type: Number })
  counter = 10;

  @property({ type: Boolean })
  disabled = false;

  @property()
  first = '';

  @property()
  last = '';

  @property({ attribute: false })
  formatRange = ({ start, end }) => `${start} .. ${end}`;

  render() {
    const { base, counter, disabled, first, last, formatRange, _handleClickButton: handleClickButton } = this;
    return html`
      ${formatRange({ start: base, end: counter })}
      Hello,
      <button class="my-awesome-component-with-counter__foo" ?disabled="${disabled}" aria-disabled="${String(Boolean(disabled))}" @click="${handleClickButton}">
        <slot name="first">${first}</slot>
        <slot name="last">${last}</slot>
      </button>
      !
      <slot></slot>
    `;
  }

  static get eventBeforeIncrement() {
    return 'my-awesome-component-with-counter-beingincremented';
  }

  static get eventIncrement() {
    return 'my-awesome-component-with-counter-incremented';
  }

  static styles = css`
    :host(my-awesome-component-with-counter) {
      display: block;
      background-color: cyan;
    }

    :host(my-awesome-component-with-counter) .my-awesome-component-with-counter__foo {
      font-weight: 700;
    }
  `;
}

export default MyAwesomeComponent;
