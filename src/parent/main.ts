import { isIframeMessage, IframeToParentMessage, MessageType } from "../types/messages";

const iframeHeightEl = document.getElementById("val-height")!;
const lastModifiedDateEl = document.getElementById("val-date")!;
const childFrame = document.getElementById("child-frame") as HTMLIFrameElement;

const ALLOWED_ORIGIN: string = window.location.origin;

window.addEventListener("message", (event: MessageEvent) => {
  // Security: reject messages from unexpected origins
  if (event.origin !== ALLOWED_ORIGIN) return;

  if (!isIframeMessage(event.data)) return;

  console.debug("[parent] ← received", event.data);
  handleIframeMessage(event.data);
});

function handleIframeMessage(msg: IframeToParentMessage): void {
  switch (msg.type) {
    case MessageType.IFRAME_HEIGHT: {
      childFrame.style.height = `${msg.payload.height}px`;
      iframeHeightEl.textContent = `${msg.payload.height}px`;
      break;
    }
    case MessageType.API_DATA: {
      lastModifiedDateEl.textContent = msg.payload.lastModifiedDate;
      break;
    }
    default: {
      // Exhaustiveness check: tsc will error if the union grows without handling it
      const _exhaustive: never = msg;
      console.warn("Unhandled message type", _exhaustive);
    }
  }
}
