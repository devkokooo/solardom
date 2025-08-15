import type { Node } from "./Node";
import { NodeImpl } from "./Node";

// https://developer.mozilla.org/en-US/docs/Web/API/Element
interface Element extends Node { }

interface ElementConstructor {
  new(): Element;
}

// https://dom.spec.whatwg.org/#interface-element
class ElementImpl extends NodeImpl implements Element {}

const Element: ElementConstructor = ElementImpl;
export { Element };
