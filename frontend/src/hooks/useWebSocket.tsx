import { useEffect } from "react";
import { socket } from "../socket";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserOrdersAtom, queriedOrderAtom } from "../states/orderState";

export const useWebSocket = () => {
  const eventName = "orderStatus";
  const setQueriedOrder = useSetRecoilState(queriedOrderAtom);
  const [userOrders, setUserOrders] = useRecoilState(currentUserOrdersAtom);

  useEffect(() => {
    const eventListener = (data: Order) => {
      setQueriedOrder(data);
      const orderExisted = userOrders.some(order => order._id === data._id);
      if (!orderExisted) {
        setUserOrders([data,...userOrders]);
      } else {
        const updatedOrders = userOrders.map(order =>
          order._id === data._id ? data : order,
        );
        setUserOrders(updatedOrders);
      }

      console.log("data", data);
    };

    socket.on(eventName, eventListener);
    return () => {
      socket.off(eventName, eventListener);
    };
  }, [eventName, setQueriedOrder]);
};
