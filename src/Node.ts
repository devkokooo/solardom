import type { EventTarget } from "./EventTarget";
import { EventTargetImpl } from "./EventTarget";

// https://developer.mozilla.org/en-US/docs/Web/API/Node
interface Node extends EventTarget {}

// https://dom.spec.whatwg.org/#interface-node
export abstract class NodeImpl extends EventTargetImpl implements Node {}

const Node: Node = NodeImpl as any;
export { Node };
