import { html, render } from 'lit-html';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import '../../src/my-awesome-component';

const template = (props?) => {
  const { first, last } = props ?? {};
  return html`
    <my-awesome-component first="${ifNonNull(first)}" last="${ifNonNull(last)}"></my-awesome-component>
  `;
};

const normalizeWhitespace = s => s?.replace(/\s+/g, ' ').trim() ?? '';

describe('my-awesome-component', function() {
  it('should render with various arguments', async function() {
    render(template({ first: 'Jeff', last: 'Chew' }), document.body);
    await 0; // Wait for template update cycle (Happens in end of micro-task)
    const myAwesomeComponent = document.querySelector('my-awesome-component');
    const button = myAwesomeComponent!.shadowRoot!.querySelector('button.my-awesome-component__foo');
    expect(normalizeWhitespace(button!.textContent)).toBe('Jeff Chew');
  });  

  afterEach(async function() {
    render(undefined!, document.body);
  });
});
