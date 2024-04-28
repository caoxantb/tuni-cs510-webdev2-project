import { useEffect } from "react";
import { socket } from "../socket";
import { useSetRecoilState } from "recoil";
import { queriedOrderAtom } from "../states/orderState";

export const useWs = () => {
  const eventName = "orderStatus";
  const setQueriedOrder = useSetRecoilState(queriedOrderAtom);

  useEffect(() => {
    const eventListener = (data: any) => {
      setQueriedOrder(data);
      console.log("data", data);
    };

    socket.on(eventName, eventListener);
    return () => {
      socket.off(eventName, eventListener);
    };
  }, [eventName, setQueriedOrder]);
};
