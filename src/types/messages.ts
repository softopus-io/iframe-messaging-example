export const MessageType = {
  IFRAME_HEIGHT: "IFRAME_HEIGHT",
  API_DATA: "API_DATA",
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export type IframeToParentMessage =
  | {
      type: typeof MessageType.IFRAME_HEIGHT;
      payload: {
        height: number;
      };
    }
  | {
      type: typeof MessageType.API_DATA;
      payload: {
        lastModifiedDate: string;
      };
    };

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isIframeHeightPayload(payload: unknown): boolean {
  return isObject(payload) && typeof payload.height === "number";
}

function isApiDataPayload(payload: unknown): boolean {
  return isObject(payload) && typeof payload.lastModifiedDate === "string";
}

export function isIframeMessage(data: unknown): data is IframeToParentMessage {
  if (!isObject(data) || !("type" in data)) return false;

  switch (data.type) {
    case MessageType.IFRAME_HEIGHT:
      return isIframeHeightPayload(data.payload);
    case MessageType.API_DATA:
      return isApiDataPayload(data.payload);
    default:
      return false;
  }
}
