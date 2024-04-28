import { message } from "antd";

type MessageType = "success" | "warning" | "error";

/**
 * Custom hook for displaying popup messages.
 * @returns A tuple containing the messagePopup function and the contextHolder component.
 */
export const usePopupMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  /**
   * Displays a popup message.
   * @param {MessageType} type - The type of the message.
   * @param {string} msg - The content of the message.
   */
  const messagePopup = (type: MessageType, msg: string) => {
    messageApi.open({
      type,
      content: msg,
      duration: 1.5,
    });
  };

  return [messagePopup, contextHolder] as const;
};
