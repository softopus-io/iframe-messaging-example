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

export function isIframeMessage(data: unknown): data is IframeToParentMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    Object.values(MessageType).includes(
      (data as IframeToParentMessage).type as MessageType
    )
  );
}
