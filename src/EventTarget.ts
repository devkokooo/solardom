import type { AbortSignal } from "./AbortSignal";
import type { Event } from "./Event";
import type { DOMString } from "./WebIDL.types";

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
export class EventTarget {
  constructor() { }

  #listeners: Map<DOMString, EventListener[]> = new Map();

  addEventListener(
    type: DOMString,
    listener?: EventListener,
    options: AddEventListenerOptions | boolean = {
      capture: false,
      once: false,
      passive: false,
    }
  ) {
    if (this.#listeners.has(type)) {
      const prevListeners = this.#listeners.get(type)!;

      if (listener === undefined)
        this.#listeners.set(type, [...prevListeners, new EventListener()]);
      else
        this.#listeners.set(type, [...prevListeners, listener]);
    }
    else {
      if (listener === undefined)
        this.#listeners.set(type, [new EventListener()]);
      else
        this.#listeners.set(type, [listener]);
    }

    if (typeof options === "object") {
      const { capture, once, passive } = options;
    }
    else if (typeof options === "boolean") {
      const useCapture = options;
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
  removeEventListener(
    type: DOMString,
    listener?: EventListener,
    options: EventListenerOptions | boolean = {
      capture: false,
    }
  ) {
    /*
      TODO: if a listener is registered twice, one with the capture flag set and
      one without, you must remove each one separately. Removal of a capturing
      listener does not affect a non-capturing version of the same listener,
      and vice versa
    */
    this.#listeners.delete(type);

    if (typeof options === "object") {
      const { capture } = options;
    }
    else if (typeof options === "boolean") {
      const useCapture = options;
    }
  }

  dispatchEvent(event: Event) {

  }
}

class EventListener {
  handleEvent(event: Event) {}
}

interface EventListenerOptions {
  capture?: boolean;
}

interface AddEventListenerOptions extends EventListenerOptions {
  passive?: boolean;
  once?: boolean;
  signal?: AbortSignal;
}
