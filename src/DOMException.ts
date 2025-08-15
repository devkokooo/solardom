import type { DOMString } from "./WebIDL.types";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMException
 */
interface DOMException {
  readonly message: DOMString;
  readonly name: DOMString;
}

interface DOMExceptionConstructor {
  new(message?: DOMString, name?: DOMString): DOMException;
}

/**
 * TODO: serialization
 * 
 * @see https://webidl.spec.whatwg.org/#idl-DOMException
 */
class DOMExceptionImpl implements DOMException {
  constructor(message: DOMString = "", name: DOMString = "Error") {
    this.message = message;
    this.name = name;
  }

  readonly message: DOMString;
  readonly name: DOMString;
}

const DOMException: DOMExceptionConstructor = DOMExceptionImpl;
export { DOMException };
