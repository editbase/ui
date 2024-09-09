/*
 * Date Picker Component
 * Custom HTML element for date picker.
 * Manages state and accessibility.
 */

import { Base } from '../base.js';

/**
 * Date Picker component.
 */
export class DatePicker extends Base {
  /**
   * The date picker element.
   * @type {HTMLElement}
   */
  datePicker;

  /**
   * The date input element.
   * @type {HTMLElement}
   */
  dateInput;

  /**
   * The date input element.
   * @type {HTMLElement}
   */
  monthInput;

  /**
   * Date picker options.
   * @type {object}
   */
  options = {
    dateFormat: 'YYYY-MM-DD',
    monthFormat: 'MMMM YYYY',
    yearFormat: 'YYYY',
    minDate: null,
    maxDate: null,
    startDate: null,
    endDate: null,
    disabledDates: [],
    disabledMonths: [],
    onSelect: () => {},
  };

  /**
   * The current state of the component.
   * @type {'open' | 'closed'}
   */
  state = 'closed';

  /**
   * The current state of the component.
   * @type {'open' | 'closed'}
   */
  state = 'closed';

  /**
   * Connected callback.
   */
  connectedCallback() {
    super.connectedCallback();
    this.datePicker = this.querySelector('[data-date-picker]');
    this.dateInput = this.querySelector('[data-date-input]');
    this.monthInput = this.querySelector('[data-month-input]');
    this.setState();
  }

  /**
   * Set the state of the component.
   */
  setState() {
    this.setAttribute('data-state', `${this.state}`);
    this.datePicker.setAttribute('data-state', this.state);
    this.dateInput.setAttribute('data-state', this.state);
    this.monthInput.setAttribute('data-state', this.state);
  }
}

if (typeof customElements !== 'undefined') {
  customElements.define('ui-date-picker', DatePicker);    
}