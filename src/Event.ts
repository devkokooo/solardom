import { EventTarget } from "./EventTarget";
import type { DOMString } from "./WebIDL.types";

/**
 * Represents an event which takes place on an {@linkcode EventTarget}.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event
 */
interface Event {
  /**
   * A boolean value indicating whether or not the event bubbles up through the DOM.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles
   */
  readonly bubbles: boolean;
  /**
   * A boolean value indicating whether the event is cancelable.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable
   */
  readonly cancelable: boolean;
  /**
   * A boolean indicating whether or not the event can bubble across the boundary
   * between the shadow DOM and the regular DOM.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/composed
   */
  readonly composed: boolean;
  /**
   * A reference to the currently registered target for the event. This is the
   * object to which the event is currently slated to be sent. It's possible this
   * has been changed along the way through *retargeting*.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
   */
  readonly currentTarget?: EventTarget;
  /**
   * Indicates whether or not the call to
   * {@linkcode Event.preventDefault()|event.preventDefault()} canceled the event.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/defaultPrevented
   */
  readonly defaultPrevented: boolean;
  /**
   * Indicates which phase of the event flow is being processed. It is one of
   * the following numbers: `NONE`, `CAPTURING_PHASE`, `AT_TARGET`, `BUBBLING_PHASE`.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
   */
  readonly eventPhase: number;
  /**
   * Indicates whether or not the event was initiated by the browser (after a
   * user click, for instance) or by a script (using an event creation method,
   * for example).
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
   */
  readonly isTrusted: boolean;
  /**
   * A reference to the object to which the even was original dispatched.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/target
   */
  readonly target?: EventTarget;
  /**
   * The time at which the event was created (in milliseconds).
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp
   */
  readonly timeStamp: number;
  /**
   * The name identifying the type of the event.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/type
   */
  readonly type: DOMString;

  /**
   * Returns the event's path (an array of objects on which listeners will be
   * invoked). This does not include nodes in shadow trees if the shadow root
   * was created with its {@linkcode ShadowRoot.mode} closed.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
   */
  composedPath(): EventTarget[];
  /**
   * Cancels the event (if it is cancelable).
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
   */
  preventDefault(): void;
  /**
   * For this particular event, prevent all other listeners from being called.
   * This includes listeners attached to the same element as well as those
   * attached to elements that will be traversed later (during the capture
   * phase, for instance).
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
   */
  stopImmediatePropagation(): void;
  /**
   * Stops the propagation of events further along in the DOM.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
   */
  stopPropagation(): void;
}

interface EventConstructor {
  new(type: DOMString, options?: EventInit): Event;
}

enum EventPhase {
  NONE = 0,
  CAPTURING_PHASE = 1,
  AT_TARGET = 2,
  BUBBLING_PHASE = 3,
}

/**
 * @see https://dom.spec.whatwg.org/#interface-event
 */
export class EventImpl implements Event {
  constructor(type: DOMString, options?: EventInit) {
    this.#type = type;
    this.#bubbles = options?.bubbles || false;
    this.#cancelable = options?.cancelable || false;
    this.#composed = options?.composed || false;

    this._isInitialized = true;
  }

  _isInitialized: boolean;
  _hasDispatched: boolean = false;
  _isCanceled: boolean = false;

  #bubbles: boolean;
  #cancelable: boolean;
  #composed: boolean;
  #currentTarget?: EventTarget;
  #defaultPrevented: boolean = false;
  #eventPhase: EventPhase = EventPhase.NONE;
  #isTrusted: boolean = false;
  #target?: EventTarget;
  #timeStamp: number = 0; // TODO: update to time (ms) since epoch
  #type: DOMString;

  get bubbles(): boolean { return this.#bubbles }
  get cancelable(): boolean { return this.#cancelable }
  get composed(): boolean { return this.#composed }
  get currentTarget(): EventTarget | undefined { return this.#currentTarget }
  get defaultPrevented(): boolean { return this.#defaultPrevented }
  get eventPhase(): number { return this.#eventPhase }
  get isTrusted(): boolean { return this.#isTrusted }
  get target(): EventTarget | undefined { return this.#target }
  get timeStamp(): number { return this.#timeStamp }
  get type(): DOMString { return this.#type }

  _setCurrentTarget(newTarget: EventTarget): void {
    this.#currentTarget = newTarget;
  }
  _setIsTrusted(newTrust: boolean): void {
    this.#isTrusted = newTrust;
  }
  _setTarget(newTarget: EventTarget): void {
    this.#target = newTarget;
  }

  composedPath(): EventTarget[] { return [] }
  preventDefault() {}
  stopImmediatePropagation() {}
  stopPropagation() {}
}

interface EventInit {
  bubbles?: boolean,
  cancelable?: boolean,
  composed?: boolean,
}

const Event: EventConstructor = EventImpl;
export { Event };
