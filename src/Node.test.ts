import { test, expect, describe, beforeEach } from "vitest";
import type { Node } from "./Node";
import { NodeImpl } from "./Node";

class TestNode extends NodeImpl {}

describe("WebIDL structural tests", () => {
  let node: Node;

  beforeEach(() => {
    node = new TestNode();
  });

  test("should have `appendChild()`", () => {
    expect(typeof node["appendChild"]).toEqual("function");
  });
});
