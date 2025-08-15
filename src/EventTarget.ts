import type { AbortSignal } from "./AbortSignal";
import type { Event, EventImpl } from "./Event";
import type { DOMString } from "./WebIDL.types";

/**
 * Implemented by objects that can receive events and may have listeners for
 * them. In other words, any target of events implements the three methods
 * associated with this interface.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 */
interface EventTarget {
  /**
   * Registers an event handler of a specific event type on the `EventTarget`.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   */
  addEventListener(
    type: DOMString,
    listener: EventListener | undefined,
    options: AddEventListenerOptions | boolean
  ): void;

  /**
   * Removes an event listener from the `EventTarget`.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
   */
  removeEventListener(
    type: DOMString,
    listener: EventListener | undefined,
    options: EventListenerOptions | boolean
  ): void;

  /**
   * Dispatches an event to this `EventTarget`.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
   */
  dispatchEvent(event: Event): boolean;
}

interface EventTargetConstructor {
  new(): EventTarget;
}

export class EventTargetImpl implements EventTarget {
  constructor() { }

  #listeners: Map<DOMString, EventListener[]> = new Map();

  addEventListener(
    type: DOMString,
    listener: EventListener | undefined,
    options: AddEventListenerOptions | boolean = {
      capture: false,
      once: false,
      passive: false,
    }
  ): void {
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

  removeEventListener(
    type: DOMString,
    listener: EventListener | undefined,
    options: EventListenerOptions | boolean = {
      capture: false,
    }
  ): void {
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

  dispatchEvent(event: Event): boolean {
    (event as EventImpl)._setTarget(this);
    (event as EventImpl)._setCurrentTarget(this);

    return true;
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

const EventTarget: EventTargetConstructor = EventTargetImpl;
export { EventTarget };
