import { message } from "antd";

type MessageType = "success" | "warning" | "error";

export const usePopupMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const messagePopup = (type: MessageType, msg: string) => {
    messageApi.open({
      type,
      content: msg,
      duration: 1.5
    });
  };

  return [messagePopup, contextHolder] as const;
};
