export type DOMString = string;
/**
 * WARNING: specifications should only use USVString for APIs that perform
 * text processing and need a string of scalar values to operate on.
 * 
 * Most APIs that use strings should instead be using DOMString, which does not
 * make any interpretations of the code units in the string. When in doubt, use
 * DOMString.
 */
export type USVString = DOMString;
