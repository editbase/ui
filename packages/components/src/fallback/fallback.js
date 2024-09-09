/*
 * Fallback Component
 * Custom HTML element for fallback content.
 * Manages state and accessibility.
 */

import { Base } from '../base.js';

/**
 * Fallback component.
 */
export class Fallback extends Base {
  /**
   * Whether the content is loaded.
   * @type {boolean}
   */
  loaded = false;

  /**
   * The content element.
   * @type {HTMLElement}
   */  
  content;

  /**
   * The fallback element.
   * @type {HTMLElement}
   */  
  fallback;

  /**
   * Connected callback.
   */
  connectedCallback() {
    super.connectedCallback();
    if(!this.fallback()) {
      this.fallback = this.querySelector('[data-fallback]');
    }
    if(!this.content()) {
      this.content = this.querySelector('[data-content]');
    }
    this.content.addEventListener('load', this.onLoad.bind(this));
    this.fallback.addEventListener('load', this.mediaLoad.bind(this));
    this.setState();
  }

  /**
   * Handle the load event.
   */
  onLoad() {
    const mediaTypes = ['image', 'video', 'audio'];
    if(this.content.tagName.includes(mediaTypes)) {
      switch(this.content.tagName) {
        case 'IMG':
          this.loaded = this.complete;
          break;
      }
    }
    this.loaded = true;
  }
}