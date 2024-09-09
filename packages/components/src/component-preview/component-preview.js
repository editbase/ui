/**
 * Theme Switcher Component
 * Custom HTML element for theme switcher.
 * Manages state and accessibility.
 */

import { Base } from '../base.js';

/**
 * Theme Switcher component.
 */
export class ThemeSwitcher extends Base {
  /**
   * The current state of the component.
   * @type {'meanjin' | 'gadigal' | 'naarm'}
   */
  theme;

  /**
   * The content element.
   * @type {HTMLElement}
   */
  content;

  /**
   * Connected callback.
   */
  connectedCallback() {
    super.connectedCallback();
    this.content = this.querySelector('[data-tab]');
    this.theme = this.content.getAttribute('data-tab') || 'gadigal'; // Default to 'gadigal'
    this.updateTheme(); // Set initial theme based on SSR
    this.setState();

    // Add event listeners for theme buttons
    this.addEventListeners();
  }

  /**
   * Add event listeners for theme buttons.
   */
  addEventListeners() {
    const buttons = this.querySelectorAll('button[data-tab]');
    buttons.forEach(button => {
      button.addEventListener('click', () => this.changeTheme(button.dataset.theme));
    });
  }

  /**
   * Change the theme based on button click.
   * @param {string} newTheme - The theme to switch to.
   */
  changeTheme(newTheme) {
    if (['meanjin', 'gadigal', 'naarm'].includes(newTheme)) {
      this.theme = newTheme;
      this.setState(); // Update state and attributes
      this.dispatchEvent(new CustomEvent('stateChange', { detail: this.theme }));
    }
  }

  /**
   * Set the state of the component.
   */
  setState() {
    this.setAttribute('data-tab', this.theme);
    // this.trigger.setAttribute('aria-expanded', this.open);
    this.content.setAttribute('data-tab', this.theme);
    this.content.setAttribute('aria-hidden', !this.open);
    
    // Update classes based on the current theme
    this.updateTheme();
  }

  /**
   * Update the theme class on the component.
   */
  updateTheme() {
    // Remove previous theme classes
    this.classList.remove('theme-meanjin', 'theme-gadigal', 'theme-naarm');
    
    // Add the current theme class
    this.classList.add(`theme-${this.theme}`);
  }
}

// Define the custom element if the customElements API is available
if (typeof customElements !== 'undefined') {
  customElements.define('ui-component-preview', ThemeSwitcher);
}