import { MessageType } from "../types/messages";
import type { IframeToParentMessage } from "../types/messages";

// Abort if not embedded — avoids sending messages when opened directly
const isEmbedded = window.self !== window.top;

// ----- 1. Send iframe height -----

function sendHeight(): void {
  const height = document.documentElement.scrollHeight;
  const msg: IframeToParentMessage = {
    type: MessageType.IFRAME_HEIGHT,
    payload: { height },
  };
  console.debug("[iframe] → sending", msg);
  window.parent.postMessage(msg, "*");
}

function observeHeight(): void {
  sendHeight();
  const ro = new ResizeObserver(() => sendHeight());
  ro.observe(document.body);
}

if (isEmbedded) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeHeight);
  } else {
    observeHeight();
  }
}

// ----- 2. Fetch mock API data and send to parent -----

interface MockApiResponse {
  lastModifiedDate: string;
}

async function fetchAndSendApiData(): Promise<void> {
  const statusEl = document.getElementById("status")!;

  try {
    const mockData = await fakeFetch();

    const msg: IframeToParentMessage = {
      type: MessageType.API_DATA,
      payload: { lastModifiedDate: mockData.lastModifiedDate },
    };
    console.debug("[iframe] → sending", msg);
    window.parent.postMessage(msg, "*");

    statusEl.textContent = `Data sent to parent at ${new Date().toLocaleTimeString()}`;
  } catch (err) {
    statusEl.textContent = `Error: ${String(err)}`;
  }
}

// Simulates a network request with a 300ms delay
function fakeFetch(): Promise<MockApiResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ lastModifiedDate: "2026-02-28T14:32:00Z" });
    }, 300);
  });
}

if (isEmbedded) {
  fetchAndSendApiData();
}

// ----- 3. Test controls: add/remove content blocks to exercise ResizeObserver -----

const extraContent = document.getElementById("extra-content")!;
let blockCount = 0;

document.getElementById("btn-add")!.addEventListener("click", () => {
  blockCount += 1;
  const block = document.createElement("div");
  block.className = "extra-block";
  block.dataset.block = String(blockCount);
  block.textContent = `Block #${blockCount} — added at ${new Date().toLocaleTimeString()}`;
  extraContent.appendChild(block);
});

document.getElementById("btn-remove")!.addEventListener("click", () => {
  const last = extraContent.lastElementChild;
  if (last) {
    extraContent.removeChild(last);
    blockCount = Math.max(0, blockCount - 1);
  }
});
