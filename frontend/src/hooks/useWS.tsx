import { useEffect } from "react";
import { socket } from "../socket";

export const useWs = () => {
  useEffect(() => {
    socket.on("orderStatus", order => {
      console.log("Order status changed", order);
    });
  }, []);
};
