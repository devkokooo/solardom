import { test, expect, describe, beforeEach } from "vitest";
import { EventTarget, EventTargetImpl } from "./EventTarget";
import { Event, EventImpl } from "./Event";
import type { EventTargetConstructor } from "./EventTarget";

describe("WebIDL structural tests", () => {
  let target: EventTarget;

  beforeEach(() => {
    target = new EventTarget();
  });

  test("should have parameterless constructor", () => {
    const ctor: EventTargetConstructor = EventTargetImpl;
    expect(target).toBeInstanceOf(ctor);
  });

  test("should have `addEventListener()`", () => {
    expect(typeof target["addEventListener"]).toEqual("function");
  });

  test("should have `removeEventListener()`", () => {
    expect(typeof target["removeEventListener"]).toEqual("function");
  });

  test("should have `dispatchEvent()`", () => {
    expect(typeof target["dispatchEvent"]).toEqual("function");
  });
});

describe("DOM standard tests", () => {
  // https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent
  describe("dispatchEvent(event)", () => {
    let e: EventImpl;
    let target: EventTarget;

    beforeEach(() => {
      e = new Event("test_dispatchEvent") as EventImpl;
      target = new EventTarget();
    });

    // 1. If event's dispatch flag is set, or if its initialized flag is not set,
    // then throw an "InvalidStateError" DOMException.
    test("should throw `InvalidStateError` DOMException if dispatch flag is set", () => {
      e._hasDispatched = true;

      expect(() => target.dispatchEvent(e)).toThrowError(
        "Event is already being dispatched"
      );
    });

    test("should throw `InvalidStateError` DOMException if initialized flag is not set", () => {
      e._isInitialized = false;

      expect(() => target.dispatchEvent(e)).toThrowError(
        "Event is not initialized"
      );
    });

    // 2. Initialize event's `isTrusted` attribute to false.
    test("event's `isTrusted` attribute should be initialized to false", () => {
      target.dispatchEvent(e);

      expect(e.isTrusted).toBeFalsy();
    });

    // 3. Return the result of dispatching event to this.
    // https://dom.spec.whatwg.org/#concept-event-dispatch
    describe("dispatch method steps", () => {
      test("Event.target should be set to current EventTarget", () => {
        target.dispatchEvent(e);

        expect(e.target).toBe(target);
      });

      // 13. Return false if event's canceled flag is set; otherwise true
      test("should return true by default", () => {
        const res = target.dispatchEvent(e);

        expect(res).toBeTruthy();
      });

      test("should return false if event's canceled flag is set", () => {
        e._isCanceled = true;
        const res = target.dispatchEvent(e);

        expect(res).toBeFalsy();
      });
    });
  });
});
