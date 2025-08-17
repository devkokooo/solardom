import type { EventTarget } from "./EventTarget";
import { EventTargetImpl } from "./EventTarget";
import type { DOMString, USVString } from "./WebIDL.types";
import type { Document } from "./Document";
import type { Element } from "./Element";
import type { NodeList } from "./NodeList";

/**
 * An abstract base class upon which many other DOM API objects are based, thus
 * letting those object types be used similarly and often interchangeably. As
 * an abstract class, there is no such thing as a plain `Node` object. All
 * objects that implement `Node` functionality are based on one of its subclasses.
 * Most notable are {@linkcode Document}, {@linkcode Element}, and
 * {@linkcode DocumentFragment}.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
 */
export interface Node extends EventTarget {
  /**
   * Returns a string representing the base URL of the document containing the
   * `Node`.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/baseURI
   */
  readonly baseURI: USVString;

  /**
   * Returns a live {@linkcode NodeList} containing all the children of this
   * node (including elements, text and comments). {@linkcode NodeList} being
   * live means that if the children of the `Node` change, the {@linkcode NodeList}
   * object is automatically updated.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
   */
  readonly childNodes: NodeList;

  /**
   * Returns a `Node` representing the first direct child node of the node, or
   * `null` if the node has no child.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild
   */
  readonly firstChild: Node | null;

  /**
   * A boolean indicating whether or not the Node is connected (directly or
   * indirectly) to the context object, e.g., the {@linkcode Document} object
   * in the case of the normal DOM, or the {@linkcode ShadowRoot} in the case of
   * a shadow DOM.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected
   */
  readonly isConnected: boolean;

  /**
   * Returns a `Node` representing the last direct child node of the node, or
   * `null` if the node has no child.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild
   */
  readonly lastChild: Node | null;

  /**
   * Returns a `Node` representing the next node in the tree, or `null` if there
   * isn't such node.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling
   */
  readonly nextSibling: Node | null;

  /**
   * Returns a string containing the name of the `Node`. The structure of the
   * name will differ with the node type. E.g. An {@linkcode HTMLElement} will
   * contain the name of the corresponding tag, like `'AUDIO'` for an
   * {@link HTMLAudioElement}, a {@link Text} node will have the `'#text'`
   * string, or a {@linkcode Document} node will have the `'#document'` string.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
   */
  readonly nodeName: DOMString;

  /**
   * Returns an `unsigned short` representing the type of the node. Possible
   * values are:
   * - `ELEMENT_NODE` - `1`
   * - `ATTRIBUTE_NODE` - `2`
   * - `TEXT_NODE` - `3`
   * - `CDATA_SECTION_NODE` - `4`
   * - `PROCESSING_INSTRUCTION_NODE` - `7`
   * - `COMMENT_NODE` - `8`
   * - `DOCUMENT_NODE` - `9`
   * - `DOCUMENT_TYPE_NODE` - `10`
   * - `DOCUMENT_FRAGMENT_NODE` - `11`
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
   */
  readonly nodeType: number;

  /**
   * Returns / Sets the value of the current node.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue
   */
  nodeValue: DOMString | null;

  /**
   * Returns the {@linkcode Document} that this node belongs to. If the node is
   * itself a document, returns `null`.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument
   */
  readonly ownerDocument: Document | null;

  /**
   * Returns a `Node` that is the parent of this node. If there is no such node,
   * like if this node is the top of the tree or if it doesn't participate in a
   * tree, this property returns `null`.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
   */
  readonly parentNode: Node | null;

  /**
   * Returns an {@linkcode Element} that is the parent of this node. If the node
   * has no parent, or if that parent is not an {@linkcode Element}, this
   * property returns `null`.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement
   */
  readonly parentElement: Element | null;

  /**
   * Returns a `Node` representing the previous node in the tree, or `null` if
   * there isn't such node.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling
   */
  readonly previousSibling: Node | null;

  /**
   * Returns / Sets the textual content of an element and all its descendants.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
   */
  textContent: DOMString | null;

  /**
   * Adds the specified `childNode` argument as the last child to the current
   * node. If the argument referenced an existing node on the DOM tree, the node
   * will be detached from its current position and attached at the new position.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
   */
  appendChild(node: Node): Node;

  /**
   * Clone a `Node`, and optionally, all of its contents. By default, it clones
   * the content of the node.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
   */
  cloneNode(subtree?: boolean): Node;

  /**
   * Compares the position of the current node against another node in any
   * other document.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
   */
  compareDocumentPosition(other: Node): number;

  /**
   * Returns `true` or `false` value indicating whether or not a node is a
   * descendant of the calling node.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
   */
  contains(other?: Node): boolean;

  /**
   * Returns the context object's root which optionally includes the shadow root
   * if it is available.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode
   */
  getRootNode(options?: GetRootNodeOptions): Node;

  /**
   * Returns a boolean value indicating whether or not the element has any
   * child nodes.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes
   */
  hasChildNodes(): boolean;

  /**
   * Inserts a `Node` before the reference node as a child of a specified
   * parent node.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
   */
  insertBefore(node: Node, child?: Node): Node;

  /**
   * Accepts a namespace URI as an argument and returns a boolean value with a
   * value of `true` if the namespace is the default namespace on the given node
   * or `false` if not.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isDefaultNamespace
   */
  isDefaultNamespace(namespace?: DOMString): boolean;

  /**
   * Returns a boolean value which indicates whether or not two nodes are of the
   * same type and all their defining data points match.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isEqualNode
   */
  isEqualNode(otherNode?: Node): boolean;

  /**
   * Returns a boolean value indicating whether or not the two nodes are the
   * same (that is, they reference the same object).
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isSameNode
   */
  isSameNode(otherNode?: Node): boolean; // legacy alias of ===

  /**
   * Returns a string containing the prefix for a given namespace URI, if
   * present, and `null` if not. When multiple prefixes are possible, the result
   * is implementation-dependent.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupNamespaceURI
   */
  lookupPrefix(namespace?: DOMString): DOMString | undefined;

  /**
   * Accepts a prefix and returns the namespace URI associated with it on the
   * given node if found (and `null` if not). Supplying `null` for the prefix
   * will return the default namespace.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupPrefix
   */
  lookupNamespaceURI(prefix?: DOMString): DOMString | undefined;

  /**
   * Clean up all the text nodes under this element (merge adjacent, remove
   * empty).
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize
   */
  normalize(): void;

  /**
   * Removes a child node from the current element, which must be a child of the
   * current node.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
   */
  removeChild(child: Node): Node;

  /**
   * Replaces one child `Node` of the current one with the second one given in
   * parameter.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
   */
  replaceChild(node: Node, child: Node): Node;
}

interface GetRootNodeOptions {
  composed: boolean;
}

/**
 * @see https://dom.spec.whatwg.org/#interface-node
 */
export abstract class NodeImpl extends EventTargetImpl implements Node {
  appendChild(node: Node): Node {
    throw new Error("Method not implemented.");
  }
}
