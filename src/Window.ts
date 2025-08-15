import type { EventTarget } from "./EventTarget";
import { EventTargetImpl } from "./EventTarget";

// https://developer.mozilla.org/en-US/docs/Web/API/Window
interface Window extends EventTarget {}

interface WindowConstructor {
  new(): Window;
}

// https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-window-object
class WindowImpl extends EventTargetImpl implements Window {}

const Window: WindowConstructor = WindowImpl;
export { Window };
