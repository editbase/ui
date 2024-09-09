import { Base } from "./base.js";

/**
 * Type for animation keyframe attributes.
 * @typedef {`animation-keyframe-${"from" | "to" | number}-${string}`} AnimationKeyframe
 */

/**
 * Type for animation option attributes.
 * @typedef {`animation-option-${"easing" | "duration" | "delay"}`} AnimationOption
 */

/**
 * Type for animate attributes.
 * @typedef {Partial<{[K in AnimationKeyframe | AnimationOption]: string}>} AnimateAttributes
 */

/**
 * The `Animate` base class provides a declarative way to use the Web Animations API through HTML attributes.
 * The `animateElement` method uses these attributes and persists the final animation state.
 * Other elements in **drab** extend this class to provide animations.
 * You can also extend this class to create your own custom animated element.
 */
export class Animate extends Base {
  /**
   * Constructor for the `Animate` class.
   */
  constructor() {
      super();
  }

  /**
   * Returns an object containing the values of each `animation-option` attribute.
   * @returns {KeyframeAnimationOptions} An object containing animation options.
   */
  get animationOptions() {
    let options = {};
    for (const attributeName of this.getAttributeNames()) {
      if (attributeName.startsWith("animation-option-")) {
        const value = this.getAttribute(attributeName);
        let [, , option] = attributeName.split("-");
        if (value) {
          if (option === "duration" || option === "delay") {
            options[option] = Number(value);
          } else if (option === "easing") {
            options[option] = value;
          }
        }
      }
    }
    console.log(options);
    return options;
  }

  /**
   * Animates a particular element using the web animations API.
   * - Disables animation if the user prefers reduced motion.
   * - Sets default options
   * - Uses the keyframes provided from `this.keyframes`
   * - Waits for the animation to complete
   * - Sets the start and end styles based on the first and last keyframe
   * @param {object} animateOptions - animates `this.content()` by default
   * @param {HTMLElement} animateOptions.element - The element to animate.
   * @param {KeyframeAnimationOptions} animateOptions.options - Animation options.
   * @returns {Promise<void>} A promise that resolves when the animation is complete.
   */
  async animateElement(animateOptions = {}) {
    let { element = this.getContent(), options = {} } = animateOptions;

    const keyframes = this.keyframes;

    if (
      keyframes.length &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // options passed in via JS override the html attributes
      options = Object.assign(this.animationOptions, options);

      // defaults
      if (!options.duration) options.duration = 200;
      if (!options.easing) options.easing = "ease-in-out";

      let startStyles = keyframes.at(0);
      let endStyles = keyframes.at(-1);

      if (startStyles && endStyles) {
        // Don't modify the start/end style based on these,
        // everything else is a CSS property.
        // This is instead of doing `fill` since it is discouraged:
        // https://www.w3.org/TR/web-animations-1/#fill-behavior
        const notStyles = ["composite", "easing", "offset"];

        for (const key of notStyles) {
          delete startStyles[key];
          delete endStyles[key];
        }
      }

      if (options.direction?.includes("reverse")) {
          // swap the start and ending values
          [startStyles, endStyles] = [endStyles, startStyles];
      }

      Object.assign(element.style, startStyles);

      const animation = element.animate(keyframes, options);

      await animation.finished;

      Object.assign(element.style, endStyles);
    }
  }

  /**
   * Returns an array of keyframes from the HTML attributes.
   * @returns {Keyframe[]} An array of keyframes.
   */
  get keyframes() {
    let keyframes = []; // Initialize keyframes as an empty array
  
    for (const attributeName of this.getAttributeNames()) {
      const value = this.getAttribute(attributeName);
  
      let [, , offset, ...propertyArray] = attributeName.split("-");
  
      if (attributeName.startsWith("animation-keyframe-")) {
        const property = propertyArray
          .map((v, i) => {
            if (i < 1) return v;
            return v.at(0)?.toUpperCase() + v.slice(1);
          })
          .join("");
  
        if (offset && property) {
          if (offset === "from") offset = "0";
          else if (offset === "to") offset = "1";
          else offset = String(parseInt(offset) * 0.01);
  
          const numberOffset = Number(offset);
  
          const sameOffsetKeyframe = keyframes.find(
            (v) => v.offset === numberOffset,
          );
  
          if (sameOffsetKeyframe) {
            sameOffsetKeyframe[property] = value;
          } else {
            keyframes.push({
              [property]: value,
              offset: numberOffset,
            });
          }
        }
      }
    }
  
    keyframes.sort((a, b) => Number(a.offset) - Number(b.offset));
  
    return keyframes;
  }  
}