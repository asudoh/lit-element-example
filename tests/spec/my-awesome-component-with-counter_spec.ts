import { html, render } from 'lit-html';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import EventManager from '../utils/event-manager';
import '../../src/my-awesome-component-with-counter';

const template = (props?) => {
  const { disabled, first, last, base, counter, formatRange } = props ?? {};
  return html`
    <my-awesome-component-with-counter
      ?disabled="${disabled}"
      first="${ifNonNull(first)}"
      last="${ifNonNull(last)}"
      base="${ifNonNull(base)}"
      counter="${ifNonNull(counter)}"
      .formatRange="${ifNonNull(formatRange)}"
    >
    </my-awesome-component-with-counter>
  `;
};

const normalizeWhitespace = s => s?.replace(/\s+/g, ' ').trim() ?? '';

describe('my-awesome-component-with-counter', function() {
  const events = new EventManager();

  it('should render with minimum arguments', async function() {
    render(template({ first: 'Jeff', last: 'Chew' }), document.body);
    await 0; // Wait for template update cycle (Happens in end of micro-task)
    const myAwesomeComponent = document.querySelector('my-awesome-component-with-counter');
    expect(normalizeWhitespace(myAwesomeComponent!.shadowRoot!.textContent)).toBe('0 .. 10 Hello, Jeff Chew !');
  });  

  it('should support changing base', async function() {
    render(template({ first: 'Jeff', last: 'Chew', base: 1, counter: 20 }), document.body);
    await 0; // Wait for template update cycle (Happens in end of micro-task)
    const myAwesomeComponent = document.querySelector('my-awesome-component-with-counter');
    expect(normalizeWhitespace(myAwesomeComponent!.shadowRoot!.textContent)).toBe('1 .. 20 Hello, Jeff Chew !');
  });  

  it('should support alternate range formatter', async function() {
    render(template({ first: 'Jeff', last: 'Chew', formatRange: ({ start, end }) => `${start} - ${end}` }), document.body);
    await 0; // Wait for template update cycle (Happens in end of micro-task)
    const myAwesomeComponent = document.querySelector('my-awesome-component-with-counter');
    expect(normalizeWhitespace(myAwesomeComponent!.shadowRoot!.textContent)).toBe('0 - 10 Hello, Jeff Chew !');
  });

  it('should increment the counter upon button click', async function() {
    render(template({ first: 'Jeff', last: 'Chew' }), document.body);
    await 0; // Wait for template update cycle (Happens in end of micro-task)
    const myAwesomeComponent = document.querySelector('my-awesome-component-with-counter');
    const button = myAwesomeComponent!.shadowRoot!.querySelector('button.my-awesome-component-with-counter__foo');
    (button as HTMLElement).click();
    await 0; // Wait for template update cycle (Happens in end of micro-task)
    expect(normalizeWhitespace(myAwesomeComponent!.shadowRoot!.textContent)).toBe('0 .. 11 Hello, Jeff Chew !');
  });

  it('should fire a custom event upon incrementing counter', async function() {
    render(template({ first: 'Jeff', last: 'Chew' }), document.body);
    await 0; // Wait for template update cycle (Happens in end of micro-task)
    const spyBeforeIncremented = jasmine.createSpy('before incremented');
    const spyAfterIncremented = jasmine.createSpy('after incremented');
    const myAwesomeComponent = document.querySelector('my-awesome-component-with-counter');
    events.on(myAwesomeComponent!, 'my-awesome-component-with-counter-beingincremented', spyBeforeIncremented);
    events.on(myAwesomeComponent!, 'my-awesome-component-with-counter-incremented', spyAfterIncremented);
    const button = myAwesomeComponent!.shadowRoot!.querySelector('button.my-awesome-component-with-counter__foo');
    (button as HTMLElement).click();
    expect(spyBeforeIncremented).toHaveBeenCalled();
    expect(spyAfterIncremented).toHaveBeenCalled();
  });

  it('should provide a way to prevent incrementing counter', async function() {
    render(template({ first: 'Jeff', last: 'Chew' }), document.body);
    await 0; // Wait for template update cycle (Happens in end of micro-task)
    const spyAfterIncremented = jasmine.createSpy('after incremented');
    const myAwesomeComponent = document.querySelector('my-awesome-component-with-counter');
    events.on(myAwesomeComponent!, 'my-awesome-component-with-counter-beingincremented', event => {
      event.preventDefault();
    });
    events.on(myAwesomeComponent!, 'my-awesome-component-with-counter-incremented', spyAfterIncremented);
    const button = myAwesomeComponent!.shadowRoot!.querySelector('button.my-awesome-component-with-counter__foo');
    button!.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    expect(spyAfterIncremented).not.toHaveBeenCalled();
    await 0; // Wait for template update cycle (Happens in end of micro-task)
    expect(normalizeWhitespace(myAwesomeComponent!.shadowRoot!.textContent)).toBe('0 .. 10 Hello, Jeff Chew !');
  });

  afterEach(async function() {
    render(undefined!, document.body);
    events.reset();
  });
});
