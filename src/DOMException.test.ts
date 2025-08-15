import { test, expect, describe } from "vitest";
import { DOMException } from "./DOMException";

describe("constructor", () => {
  test("should have default params", () => {
    const ex = new DOMException();

    expect(ex.message).toEqual("");
    expect(ex.name).toEqual("Error");
  });

  test("should allow setting message param", () => {
    const ex = new DOMException("Broken");

    expect(ex.message).toEqual("Broken");
  });

  test("should allow setting name param", () => {
    const ex = new DOMException("Broken", "WeirdError");

    expect(ex.name).toEqual("WeirdError");
  });
});
