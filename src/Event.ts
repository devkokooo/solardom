import type { EventTarget } from "./EventTarget";

// https://developer.mozilla.org/en-US/docs/Web/API/Event
export class Event {
  constructor(type: string, options: EventInit = {
    bubbles: false,
    cancelable: false,
    composed: false,
  }) {
    this.type = type;
    this.bubbles = options.bubbles!;
    this.cancelable = options.cancelable!;
    this.composed = options.composed!;
  }

  readonly type: string;
  readonly target?: EventTarget;
  readonly currentTarget?: EventTarget;
  composedPath(): EventTarget[] {}

  static readonly NONE: number = 0;
  static readonly CAPTURING_PHASE: number = 1;
  static readonly AT_TARGET: number = 2;
  static readonly BUBBLING_PHASE: number = 3;
  readonly eventPhase: number;

  stopPropagation() {}
  stopImmediatePropagation() {}

  readonly bubbles: boolean;
  readonly cancelable: boolean;
  preventDefault() {}
  readonly defaultPrevented: boolean;
  readonly composed: boolean;

  static readonly isTrusted: boolean;
  readonly timeStamp: number;
}

interface EventInit {
  bubbles?: boolean,
  cancelable?: boolean,
  composed?: boolean,
}
