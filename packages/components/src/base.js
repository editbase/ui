/**
 * The Base class is a custom HTML element that provides a foundation for other custom elements.
 * It includes methods for managing event listeners, swapping content, and handling lifecycle events.
 * This class is designed to be extended by other custom elements to inherit its functionality.
 */

/**
 * SSR Fallback
 */
const HTMLElementClass= typeof HTMLElement === 'undefined' ? class {} : HTMLElement;

export class Base extends HTMLElementClass {
  /**
   * Abort controller for event listeners.
   * @private
   */
  #listenerController = new AbortController();

  /**
   * Constructor.
   */
  constructor() {
    super();
  }

  /**
   * UUID
   * @returns {string}
   */
  get uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Event to trigger.
   * @type {string}
   * @default "click"
   */
  get event() {
    return this.getAttribute("event") ?? "click";
  }

  /**
   * Set event.
   * @param {string} value
   */
  set event(value) {
    this.setAttribute("event", value);
  }

  /**
   * Get trigger elements.
   * @template {HTMLElement} T
   * @returns {NodeListOf<T>}
   */
  getTrigger() {
    return this.querySelectorAll(this.getAttribute("trigger") ?? "[data-trigger]");
  }

  /**
   * Get content element.
   * @template {HTMLElement} T
   * @param {function(): T} instance
   * @returns {T}
   */
  getContent(instance = HTMLElement) {
    const content = this.querySelector(this.getAttribute("content") ?? "[data-content]");
    if (content instanceof instance) return content;
    throw new Error("Content not found");
  }

  /**
   * Swap content.
   * @param {boolean} revert
   * @param {number} delay
   */
  swapContent(revert = true, delay = 800) {
    const swap = this.querySelector(this.getAttribute("swap") ?? "[data-swap]");
    if (swap) {
      const currentContent = Array.from(this.getContent().childNodes);
      let placeholder = [];

      if (swap instanceof HTMLTemplateElement) {
        placeholder.push(swap.content.cloneNode(true));
        swap.content.replaceChildren(...currentContent);
      } else {
        placeholder.push(...swap.childNodes);
        swap.replaceChildren(...currentContent);
      }

      this.getContent().replaceChildren(...placeholder);

      if (revert) {
        setTimeout(() => this.swapContent(false), delay);
      }
    }
  }

  /**
   * Add event listener safely.
   * @template {keyof DocumentEventMap} K
   * @template {HTMLElement | Window | Document} T
   * @param {K} type
   * @param {(this: T, ev: DocumentEventMap[K]) => any} listener
   * @param {T} element
   * @param {AddEventListenerOptions} options
   */
  safeListener(type, listener, element = document.body, options = {}) {
      options.signal = this.#listenerController.signal;
      element.addEventListener(type, listener, options);
  }

  /**
   * Add trigger listener.
   * @template {HTMLElement} T
   * @template {keyof HTMLElementEventMap} K
   * @param {(this: T, e: HTMLElementEventMap[K]) => any} listener
   * @param {K} type
   * @param {AddEventListenerOptions} options
   */
  triggerListener(listener, type = this.event, options) {
    for (const trigger of this.getTrigger()) {
      trigger.addEventListener(type, listener, options);
    }
  }

  /**
   * Mount.
   */
  mount() {}

  /**
   * Connected callback.
   */
  connectedCallback() {
    queueMicrotask(() => this.mount());
  }

  /**
   * Destroy.
   */
  destroy() {}

  /**
   * Disconnected callback.
   */
  disconnectedCallback() {
    this.destroy();
    this.#listenerController.abort();
  }
}
