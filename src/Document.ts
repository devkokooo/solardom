import type { Node } from "./Node";
import { NodeImpl } from "./Node";

// https://developer.mozilla.org/en-US/docs/Web/API/Document
interface Document extends Node {}

interface DocumentConstructor {
  new(): Document;
}

// https://dom.spec.whatwg.org/#interface-document
class DocumentImpl extends NodeImpl implements Document {}

const Document: DocumentConstructor = DocumentImpl;
export { Document };
