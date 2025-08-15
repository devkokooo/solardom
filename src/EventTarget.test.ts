import { test, expect, describe, vi } from "vitest";
import { EventTarget } from "./EventTarget";
import { Event } from "./Event";

describe("dispatchEvent(event)", () => {
  test("should return true by default", () => {
    const e = new Event("dispatch");
    const target = new EventTarget();

    const res = target.dispatchEvent(e);

    expect(res).toBeTruthy();
  });

  test("Event.target should be set to current EventTarget", () => {
    const e = new Event("dispatch");
    const target = new EventTarget();

    target.dispatchEvent(e);

    expect(e.target).toBe(target);
  });
});
