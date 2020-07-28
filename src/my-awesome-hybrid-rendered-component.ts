import { html, css, customElement, LitElement } from 'lit-element';
import HybridRenderMixin from "@carbon/ibmdotcom-web-components/es/globals/mixins/hybrid-render";

@customElement('my-awesome-hybrid-rendered-component')
class MyAwesomeHybridRenderedComponent extends HybridRenderMixin(LitElement) {
  render() {
    return html`
      <div class="a-div">In shadow DOM</div><slot></slot>
    `;
  }

  renderLightDOM() {
    return html`
      <div class="a-div">In light DOM</div>
    `;
  }

  static styles = css`
    .a-div {
      color: blue;
    }
  `;
}

export default MyAwesomeHybridRenderedComponent;
