import { test, expect, describe, vi } from "vitest";
import { Event } from "./Event";

test("should have default options", () => {
  const e = new Event("default");
  expect(e.bubbles).toBeFalsy;
  expect(e.cancelable).toBeFalsy;
  expect(e.composed).toBeFalsy;
});

test("should have modifiable options", () => {
  const e = new Event("press", {
    bubbles: true, cancelable: true, composed: true,
  });
  expect(e.bubbles).toBeTruthy();
  expect(e.cancelable).toBeTruthy();
  expect(e.composed).toBeTruthy();
});
