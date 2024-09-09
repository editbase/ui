/**
 * Accordion Component
 * Custom HTML element for accordion content.
 * Manages state, accessibility, and animations.
 */

import { Animate } from '../animate.js';

/**
 * Accordion component.
 */
export class Accordion extends Animate {
  // /**
  //  * Whether the accordion element is open.
  //  * @type {boolean}
  //  */
  // isOpen;

  // /**
  //  * The trigger element.
  //  * @type {HTMLElement}
  //  */
  // trigger;

  // /**
  //  * The content element.
  //  * @type {HTMLElement}
  //  */
  // content;

  // /**
  //  * The current state of the component.
  //  * @type {'open' | 'closed'}
  //  */
  // state;

  // constructor() {
  //   super();
  // }

  // /**
  //  * Connected callback.
  //  */
  // connectedCallback() {
  //   super.connectedCallback();
  //   let uuid = this.id || super.uuid;
  //   let triggerId = `trigger-${uuid}`;
  //   let contentId = `content-${uuid}`;
  //   this.isOpen = this.hasAttribute('data-state') ? this.getAttribute('data-state') === 'open' : false;
  //   this.state = this.isOpen ? 'open' : 'closed';
  //   this.trigger = this.querySelector('[data-trigger]');
  //   this.trigger.setAttribute('aria-controls', contentId);
  //   this.content = this.querySelector('[data-content]');
  //   this.content.id = contentId;
  //   this.content.setAttribute('role', 'region');
  //   this.content.setAttribute('aria-labelledby', triggerId);
  //   this.setState();
  // }

  // /**
  //  * Toggle the accordion element.
  //  */
  // toggle() {
  //   if (this.isOpen) {
  //     this.close();
  //     setTimeout(() => this.content.removeAttribute('open'), 300);
  //   } else {
  //     this.content.setAttribute('open', '')
  //     setTimeout(() => this.open(), 0);
  //   }
  //   this.dispatchEvent(new CustomEvent('stateChange', { detail: this.state }));
  // }

  // /**
  //  * Open the accordion with animation.
  //  */
  // async open() {
  //   this.isOpen = true;
  //   this.state = 'open';
  //   this.setState();
  //   await this.animateElement();
  // }

  // /**
  //  * Close the accordion with animation.
  //  */
  // async close() {
  //   await this.animateElement({
  //     options: { direction: "reverse" },
  //   });
  //   this.isOpen = false;
  //   this.state = 'closed';
  //   this.setState();
  // }

  // /**
  //  * Set the state of the component.
  //  */
  // setState() {
  //   this.setAttribute('data-state', `${this.state}`);
  //   this.trigger.setAttribute('data-state', this.state);
  //   this.trigger.setAttribute('aria-expanded', `${this.isOpen}`);
  //   this.content.setAttribute('data-state', this.state);
  //   this.content.setAttribute('aria-hidden', `${!this.isOpen}`);
  // }

  // /**
  //  * Mount the component.
  //  */
  // mount() {
  //   this.triggerListener((e) => {
	// 		e.preventDefault();
  //     this.toggle();
	// 	});
  // }
}

if (typeof customElements !== 'undefined') {
  customElements.define('ui-accordion', Accordion);
}