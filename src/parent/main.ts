import { isIframeMessage, IframeToParentMessage, MessageType } from "../types/messages";
import { getEnabledOrigins } from "../config";

const iframeHeightEl = document.getElementById("val-height")!;
const lastModifiedDateEl = document.getElementById("val-date")!;
const childFrame = document.getElementById("child-frame") as HTMLIFrameElement;

const enabledOrigins = getEnabledOrigins();

window.addEventListener("message", (event: MessageEvent) => {
  // Security: reject messages from origins not in the enabled allow-list
  if (!enabledOrigins.includes(event.origin)) {
    console.error("[parent] message rejected from unlisted origin:", event.origin);
    return;
  }

  if (!isIframeMessage(event.data)) {
    console.warn("[parent] message from known origin has unexpected shape:", event.data);
    return;
  }

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
      console.warn("Unhandled message type", msg as never);
    }
  }
}
