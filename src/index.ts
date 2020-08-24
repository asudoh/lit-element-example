/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import on from 'carbon-components/es/globals/js/misc/on';
import './my-awesome-component';

(window as any).hClickDocument = on(document, 'click', (event: MouseEvent) => {
  if ((event.target as HTMLElement).id === 'fire-custom-event') {
    console.log('Firing custom event');
    document.dispatchEvent(new CustomEvent('my-awesome-component-foo', { bubbles: true }));
  }
});
