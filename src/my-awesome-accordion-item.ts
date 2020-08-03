import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ChevronRight16 from 'carbon-custom-elements/es/icons/chevron--right/16';
import styles from './my-awesome-accordion-item.scss';

const { prefix } = settings;

@customElement('my-awesome-accordion-item')
class MyAwesomeAccordionItem extends LitElement {
  /**
   * Handles user-initiated toggle request of this accordion item.
   * @param open The new open state.
   */
  private _handleUserInitiatedToggle(open = !this.open) {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        open,
      },
    };
    if (this.dispatchEvent(new CustomEvent((this.constructor as typeof MyAwesomeAccordionItem).eventBeforeToggle, init))) {
      this.open = open;
      this.dispatchEvent(new CustomEvent((this.constructor as typeof MyAwesomeAccordionItem).eventToggle, init));
    }
  }

  /**
   * Handler for the `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggle();
  }

  /**
   * Handler for the `keydown` event on the expando button.
   */
  private _handleKeydownExpando = ({ key }: KeyboardEvent) => {
    if (this.open && (key === 'Esc' || key === 'Escape')) {
      this._handleUserInitiatedToggle(false);
    }
  };

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ attribute: 'title-text' })
  titleText = '';

  render() {
    const { titleText, _handleClickExpando: handleClickExpando, _handleKeydownExpando: handleKeydownExpando } = this;
    return html`
      <button
        type="button"
        class="${prefix}--accordion__heading"
        aria-controls="content"
        aria-expanded="${String(Boolean(open))}"
        @click="${handleClickExpando}"
        @keydown="${handleKeydownExpando}"
      >
        ${ChevronRight16({
          class: `${prefix}--accordion__arrow`,
        })}
        <div class="${prefix}--accordion__title"><slot name="title">${titleText}</slot></div>
      </button>
      <div id="content" class="${prefix}--accordion__content"><slot></slot></div>
    `;
  }

  /**
   * The name of the custom event fired before this accordion item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this accordion item.
   */
  static get eventBeforeToggle() {
    return `my-awesome-accordion-item-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this accordion item is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `my-awesome-accordion-item-toggled`;
  }

  static styles = styles;
}

export default MyAwesomeAccordionItem;
