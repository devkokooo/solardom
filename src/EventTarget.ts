import type { AbortSignal } from "./AbortSignal";
import type { Event, EventImpl } from "./Event";
import type { DOMString } from "./WebIDL.types";

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
export class EventTarget {
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

  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
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

  /**
   * The `dispatchEvent()` method of the `EventTarget` sends an `Event` to the
   * object, (synchronously) invoking the affected event listeners in the
   * appropriate order. The normal event processing rules (including the
   * capturing and optional bubbling phase) also apply to events dispatched
   * manually with `dispatchEvent()`.
   * 
   * Calling `dispatchEvent()` is the last step to *firing an event*. The event
   * should have already been created and initialized using an `Event()`
   * constructor.
   * 
   * > Note: When calling this method, the `Event.target` property is initialized
   * to the current `EventTarget`.
   * 
   * Unlike "native" events, which are fired by the browser and invoke event
   * handlers asynchronously via the event loop, `dispatchEvent()` invokes event
   * handlers *synchronously*. All applicable event handlers are called and
   * return before `dispatchEvent()` returns.
   * 
   * @example dispatchEvent(event)
   * 
   * @param event The `Event` object to dispatch. Its `Event.target` property
   * will be set to the current `EventTarget`.
   * @returns `false` if `event` is cancelable, and at least one of the
   * event handlers which received `event` called `Event.preventDefault()`.
   * Otherwise `true`.
   * 
   * @throws `InvalidStateError` `DomException`
   * Thrown if the event's type was not specified during event initialization.
   * 
   * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
   */
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
