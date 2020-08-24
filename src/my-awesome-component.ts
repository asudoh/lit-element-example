import { html, css, property, customElement, LitElement } from 'lit-element';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';

@customElement('my-awesome-component')
class MyAwesomeComponent extends HostListenerMixin(LitElement) {
  @HostListener('document:eventFoo')
  // @ts-ignore
  private _handleFoo(event: CustomEvent) {
    console.log('Host event:', event);
  }

  @HostListener('parentRoot:click')
  // @ts-ignore
  private _handleClickParentRoot(event: MouseEvent) {
    console.log('Host root event:', event);
  }

  @HostListener('click')
  // @ts-ignore
  private _handleClickHost(event: MouseEvent) {
    console.log('Host event:', event);
  }

  private _handleClickButton(event: MouseEvent) {
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

  static get eventFoo() {
    return 'my-awesome-component-foo';
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
